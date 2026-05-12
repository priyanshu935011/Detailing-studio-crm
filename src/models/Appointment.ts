import { HydratedDocument, Schema, Types, model } from 'mongoose';

export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Appointment {
  customerId: Types.ObjectId;
  vehicleId: Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: AppointmentStatus;
  staffId?: Types.ObjectId;
}

const appointmentSchema = new Schema<Appointment>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true, index: true },
    timeSlot: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff' }
  },
  { timestamps: true }
);

appointmentSchema.index({ date: 1, timeSlot: 1, staffId: 1 });

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentModel = model<Appointment>('Appointment', appointmentSchema);
