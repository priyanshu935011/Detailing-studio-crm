import { HydratedDocument, Schema, model } from 'mongoose';

export interface VehicleTypePricing {
  vehicleType: string;
  price: number;
}

export interface ServiceCatalog {
  name: string;
  basePrice: number;
  vehicleTypePricing: VehicleTypePricing[];
}

const serviceCatalogSchema = new Schema<ServiceCatalog>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    basePrice: { type: Number, required: true, min: 0 },
    vehicleTypePricing: [
      {
        vehicleType: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 }
      }
    ]
  },
  { timestamps: true }
);

export type ServiceCatalogDocument = HydratedDocument<ServiceCatalog>;
export const ServiceCatalogModel = model<ServiceCatalog>('ServiceCatalog', serviceCatalogSchema);
