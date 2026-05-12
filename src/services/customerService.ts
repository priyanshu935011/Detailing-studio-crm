import { CustomerModel, Customer } from '../models/Customer';
import { VehicleModel } from '../models/Vehicle';
import { BaseCrudService } from './baseCrudService';

export class CustomerService extends BaseCrudService<Customer> {
  constructor() {
    super(CustomerModel);
  }

  async list(query: Record<string, unknown>) {
    const search = String(query.search || '').trim();
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { tags: { $elemMatch: { $regex: search, $options: 'i' } } }
          ]
        }
      : {};
    return super.list(query, filter);
  }

  async getCustomerDetails(id: string) {
    const customer = await super.getById(id);
    const vehicles = await VehicleModel.find({ customerId: customer._id });
    return { customer, vehicles };
  }
}
