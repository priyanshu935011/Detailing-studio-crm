import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface Customer {
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  notes?: string;
  membershipId?: Types.ObjectId;
}

const customerSchema = new Schema<Customer>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    tags: { type: [String], default: [] },
    notes: { type: String, default: '' },
    membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' }
  },
  { timestamps: true }
);

customerSchema.index({ name: 'text', phone: 'text', email: 'text', tags: 'text' });

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerModel = model<Customer>('Customer', customerSchema);
