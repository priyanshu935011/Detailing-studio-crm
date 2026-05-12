import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface JobCardServiceEntry {
  serviceId: Types.ObjectId;
  name: string;
  price: number;
}

export interface JobCard {
  appointmentId: Types.ObjectId;
  services: JobCardServiceEntry[];
  status: 'open' | 'in-progress' | 'completed';
  notes?: string;
  media: string[];
}

const jobCardSchema = new Schema<JobCard>(
  {
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true, unique: true },
    services: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'ServiceCatalog', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 }
      }
    ],
    status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
    notes: { type: String, default: '' },
    media: { type: [String], default: [] }
  },
  { timestamps: true }
);

export type JobCardDocument = HydratedDocument<JobCard>;
export const JobCardModel = model<JobCard>('JobCard', jobCardSchema);
