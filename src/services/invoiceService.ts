import { Invoice, InvoiceModel } from '../models/Invoice';
import { CustomerModel } from '../models/Customer';
import { BaseCrudService } from './baseCrudService';
import { parsePagination } from '../utils/pagination';
import { FilterQuery } from 'mongoose';

export class InvoiceService extends BaseCrudService<Invoice> {
  constructor() {
    super(InvoiceModel);
  }

  async list(query: Record<string, unknown>, _filter?: FilterQuery<Invoice>, _sort?: Record<string, 1 | -1>) {
    const { page, limit, search } = parsePagination(query);
    const customerMatches = search
      ? await CustomerModel.find({
          $or: [
            { phone: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } }
          ]
        }).select('_id')
      : [];

    const filter: Record<string, unknown> = {};

    if (search && customerMatches.length) {
      filter.customerId = { $in: customerMatches.map((customer) => customer._id) };
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      InvoiceModel.find(filter)
        .populate('customerId', 'name phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      InvoiceModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  private calculateTotal(services: Invoice['services'], discount = 0) {
    const subtotal = services.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return Math.max(subtotal - discount, 0);
  }

  async create(payload: Partial<Invoice>) {
    const discount = payload.discount ?? 0;
    return super.create({
      ...payload,
      discount,
      totalAmount: this.calculateTotal(payload.services ?? [], discount)
    });
  }

  async update(id: string, payload: Partial<Invoice>) {
    const current = await super.getById(id);
    const services = payload.services ?? current.services;
    const discount = payload.discount ?? current.discount;
    return super.update(id, {
      ...payload,
      totalAmount: this.calculateTotal(services, discount)
    });
  }
}
