import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface Notification {
  type: string;
  title: string;
  message: string;
  relatedCustomerId?: Types.ObjectId;
  relatedAppointmentId?: Types.ObjectId;
  read: boolean;
}

const notificationSchema = new Schema<Notification>(
  {
    type: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    relatedCustomerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    relatedAppointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

notificationSchema.index({ createdAt: -1 });

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationModel = model<Notification>('Notification', notificationSchema);
