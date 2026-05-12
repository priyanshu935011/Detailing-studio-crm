import { Vehicle, VehicleModel } from '../models/Vehicle';
import { CustomerModel } from '../models/Customer';
import { BaseCrudService } from './baseCrudService';
import { parsePagination } from '../utils/pagination';
import { FilterQuery } from 'mongoose';

export class VehicleService extends BaseCrudService<Vehicle> {
  constructor() {
    super(VehicleModel);
  }

  async list(query: Record<string, unknown>, _filter?: FilterQuery<Vehicle>, _sort?: Record<string, 1 | -1>) {
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
        { model: { $regex: search, $options: 'i' } },
        { numberPlate: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
        { color: { $regex: search, $options: 'i' } }
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
      VehicleModel.find(filter)
        .populate('customerId', 'name phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      VehicleModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }
}
