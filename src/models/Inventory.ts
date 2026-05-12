import { HydratedDocument, Schema, model } from 'mongoose';

export interface Inventory {
  name: string;
  quantity: number;
  threshold: number;
}

const inventorySchema = new Schema<Inventory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    threshold: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export type InventoryDocument = HydratedDocument<Inventory>;
export const InventoryModel = model<Inventory>('Inventory', inventorySchema);
