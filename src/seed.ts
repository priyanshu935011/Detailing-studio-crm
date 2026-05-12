import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { AppointmentModel } from './models/Appointment';
import { CustomerModel } from './models/Customer';
import { FeedbackModel } from './models/Feedback';
import { InventoryModel } from './models/Inventory';
import { InvoiceModel } from './models/Invoice';
import { JobCardModel } from './models/JobCard';
import { MembershipModel } from './models/Membership';
import { NotificationModel } from './models/Notification';
import { ServiceCatalogModel } from './models/ServiceCatalog';
import { StaffModel } from './models/Staff';
import { UserModel } from './models/User';
import { VehicleModel } from './models/Vehicle';
import { hashPassword } from './utils/auth';

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    AppointmentModel.deleteMany({}),
    CustomerModel.deleteMany({}),
    FeedbackModel.deleteMany({}),
    InventoryModel.deleteMany({}),
    InvoiceModel.deleteMany({}),
    JobCardModel.deleteMany({}),
    MembershipModel.deleteMany({}),
    NotificationModel.deleteMany({}),
    ServiceCatalogModel.deleteMany({}),
    StaffModel.deleteMany({}),
    UserModel.deleteMany({}),
    VehicleModel.deleteMany({})
  ]);

  const adminPassword = await hashPassword('Admin@123');
  const admin = await UserModel.create({
    name: 'Studio Admin',
    email: 'admin@autoglowsuite.com',
    phone: '9999999999',
    password: adminPassword,
    role: 'admin'
  });

  const staff = await StaffModel.create({
    userId: admin._id,
    name: 'Studio Admin',
    email: admin.email,
    phone: admin.phone,
    role: 'admin'
  });

  const membership = await MembershipModel.create({
    planName: 'Premium Shine',
    validity: 90,
    usageLimit: 6
  });

  const customer = await CustomerModel.create({
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul@example.com',
    tags: ['vip', 'sedan'],
    notes: 'Prefers weekend slots',
    membershipId: membership._id
  });

  const vehicle = await VehicleModel.create({
    customerId: customer._id,
    model: 'Honda City',
    numberPlate: 'DL01AB1234',
    type: 'Sedan',
    color: 'White'
  });

  const ceramic = await ServiceCatalogModel.create({
    name: 'Ceramic Coating',
    basePrice: 12000,
    vehicleTypePricing: [
      { vehicleType: 'Sedan', price: 12000 },
      { vehicleType: 'SUV', price: 15000 }
    ]
  });

  await InventoryModel.create([
    { name: 'Foam Shampoo', quantity: 14, threshold: 5 },
    { name: 'Microfiber Cloth', quantity: 3, threshold: 10 }
  ]);

  const appointment = await AppointmentModel.create({
    customerId: customer._id,
    vehicleId: vehicle._id,
    date: new Date(),
    timeSlot: '10:00-11:00',
    status: 'scheduled',
    staffId: staff._id
  });

  await JobCardModel.create({
    appointmentId: appointment._id,
    services: [{ serviceId: ceramic._id, name: ceramic.name, price: 12000 }],
    status: 'open',
    notes: 'Inspect paint before wash',
    media: []
  });

  await InvoiceModel.create({
    customerId: customer._id,
    services: [{ serviceId: ceramic._id, name: ceramic.name, price: 12000, quantity: 1 }],
    totalAmount: 11500,
    discount: 500,
    paymentStatus: 'partial'
  });

  await FeedbackModel.create({
    customerId: customer._id,
    rating: 5,
    review: 'Excellent pickup and finish quality.'
  });

  await NotificationModel.create({
    type: 'booking',
    title: 'Seed appointment created',
    message: 'A demo booking has been added to the schedule',
    relatedCustomerId: customer._id,
    relatedAppointmentId: appointment._id,
    read: false
  });

  console.log('Seed completed');
  await mongoose.connection.close();
};

void seed();
