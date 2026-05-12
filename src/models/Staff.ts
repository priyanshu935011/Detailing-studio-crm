import { HydratedDocument, Schema, Types, model } from 'mongoose';
import { UserRole } from './User';

export interface Staff {
  userId?: Types.ObjectId;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
}

const staffSchema = new Schema<Staff>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true }
  },
  { timestamps: true }
);

staffSchema.index({ email: 1 });

export type StaffDocument = HydratedDocument<Staff>;
export const StaffModel = model<Staff>('Staff', staffSchema);
