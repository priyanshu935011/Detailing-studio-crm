import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface InvoiceServiceEntry {
  serviceId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  customerId: Types.ObjectId;
  services: InvoiceServiceEntry[];
  totalAmount: number;
  discount: number;
  paymentStatus: 'pending' | 'paid' | 'partial';
}

const invoiceSchema = new Schema<Invoice>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    services: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'ServiceCatalog', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'partial'], default: 'pending' }
  },
  { timestamps: true }
);

invoiceSchema.index({ customerId: 1, createdAt: -1 });
invoiceSchema.index({ paymentStatus: 1, createdAt: -1 });

export type InvoiceDocument = HydratedDocument<Invoice>;
export const InvoiceModel = model<Invoice>('Invoice', invoiceSchema);
