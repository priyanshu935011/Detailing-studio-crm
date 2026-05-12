import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface Vehicle {
  customerId: Types.ObjectId;
  model: string;
  numberPlate: string;
  type: string;
  color: string;
}

const vehicleSchema = new Schema<Vehicle>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    model: { type: String, required: true, trim: true },
    numberPlate: { type: String, required: true, trim: true, uppercase: true },
    type: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

vehicleSchema.index({ numberPlate: 1 }, { unique: true });

export type VehicleDocument = HydratedDocument<Vehicle>;
export const VehicleModel = model<Vehicle>('Vehicle', vehicleSchema);
