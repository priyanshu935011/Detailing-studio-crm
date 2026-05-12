import { Appointment, AppointmentModel } from '../models/Appointment';
import { CustomerModel } from '../models/Customer';
import { BaseCrudService } from './baseCrudService';
import { ApiError } from '../utils/ApiError';
import { parsePagination } from '../utils/pagination';
import { NotificationService } from './notificationService';
import { FilterQuery } from 'mongoose';

const notificationService = new NotificationService();

export class AppointmentService extends BaseCrudService<Appointment> {
  constructor() {
    super(AppointmentModel);
  }

  async list(query: Record<string, unknown>, _filter?: FilterQuery<Appointment>, _sort?: Record<string, 1 | -1>) {
    const { page, limit, search } = parsePagination(query);
    const customerId = String(query.customerId || '').trim();
    const customerMatches = search
      ? await CustomerModel.find({
          $or: [
            { phone: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } }
          ]
        }).select('_id')
      : [];

    const filter: Record<string, unknown> = {};
    const orFilters: Array<Record<string, unknown>> = [];

    if (search) {
      orFilters.push(
        { timeSlot: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } }
      );

      if (customerMatches.length) {
        orFilters.push({ customerId: { $in: customerMatches.map((customer) => customer._id) } });
      }
    }

    if (orFilters.length) {
      filter.$or = orFilters;
    }

    if (customerId) {
      filter.customerId = customerId;
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      AppointmentModel.find(filter)
        .populate('customerId', 'name phone')
        .populate('vehicleId', 'model numberPlate')
        .populate('staffId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AppointmentModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  private async validateOverlap(payload: Partial<Appointment>, excludeId?: string) {
    const filter: Record<string, unknown> = {
      date: payload.date,
      timeSlot: payload.timeSlot,
      status: { $ne: 'cancelled' }
    };

    if (payload.staffId) {
      filter.staffId = payload.staffId;
    }

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const existing = await AppointmentModel.findOne(filter);
    if (existing) {
      throw new ApiError(409, 'This time slot is already booked');
    }
  }

  async create(payload: Partial<Appointment>) {
    await this.validateOverlap(payload);
    const appointment = await super.create(payload);
    await notificationService.createSystemEvent({
      type: 'booking',
      title: 'Appointment booked',
      message: `Appointment scheduled for ${appointment.timeSlot}`,
      relatedCustomerId: appointment.customerId,
      relatedAppointmentId: appointment._id
    });
    return appointment;
  }

  async update(id: string, payload: Partial<Appointment>) {
    const current = await super.getById(id);
    const merged = {
      customerId: current.customerId,
      vehicleId: current.vehicleId,
      date: payload.date ?? current.date,
      timeSlot: payload.timeSlot ?? current.timeSlot,
      status: payload.status ?? current.status,
      staffId: payload.staffId ?? current.staffId
    };
    await this.validateOverlap(merged, id);
    const appointment = await super.update(id, payload);
    if (appointment.status === 'completed') {
      await notificationService.createSystemEvent({
        type: 'completion',
        title: 'Service completed',
        message: 'An appointment has been marked as completed',
        relatedCustomerId: appointment.customerId,
        relatedAppointmentId: appointment._id
      });
    }
    return appointment;
  }
}
