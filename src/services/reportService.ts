import { AppointmentModel } from '../models/Appointment';
import { CustomerModel } from '../models/Customer';
import { InvoiceModel } from '../models/Invoice';

export class ReportService {
  async getOverview() {
    const [customers, appointments, invoices, revenueSummary] = await Promise.all([
      CustomerModel.countDocuments(),
      AppointmentModel.countDocuments({ status: { $ne: 'cancelled' } }),
      InvoiceModel.countDocuments(),
      InvoiceModel.aggregate([
        {
          $group: {
            _id: null,
            revenue: { $sum: '$totalAmount' }
          }
        }
      ])
    ]);

    return {
      customers,
      appointments,
      invoices,
      revenue: revenueSummary[0]?.revenue ?? 0
    };
  }

  async revenueByDate() {
    return InvoiceModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          invoiceCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  async serviceUsageStats() {
    return InvoiceModel.aggregate([
      { $unwind: '$services' },
      {
        $group: {
          _id: '$services.name',
          totalRevenue: { $sum: { $multiply: ['$services.price', '$services.quantity'] } },
          usageCount: { $sum: '$services.quantity' }
        }
      },
      { $sort: { usageCount: -1 } }
    ]);
  }

  async customerFrequency() {
    return AppointmentModel.aggregate([
      {
        $group: {
          _id: '$customerId',
          visits: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      { $unwind: '$customer' },
      {
        $project: {
          _id: 0,
          customerId: '$customer._id',
          name: '$customer.name',
          phone: '$customer.phone',
          visits: 1
        }
      },
      { $sort: { visits: -1 } }
    ]);
  }
}
