import { HydratedDocument, Schema, model } from 'mongoose';

export interface Membership {
  planName: string;
  validity: number;
  usageLimit: number;
}

const membershipSchema = new Schema<Membership>(
  {
    planName: { type: String, required: true, trim: true, unique: true },
    validity: { type: Number, required: true, min: 1 },
    usageLimit: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export type MembershipDocument = HydratedDocument<Membership>;
export const MembershipModel = model<Membership>('Membership', membershipSchema);
