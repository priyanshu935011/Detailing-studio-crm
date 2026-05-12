import { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface Feedback {
  customerId: Types.ObjectId;
  rating: number;
  review?: string;
}

const feedbackSchema = new Schema<Feedback>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, default: '' }
  },
  { timestamps: true }
);

export type FeedbackDocument = HydratedDocument<Feedback>;
export const FeedbackModel = model<Feedback>('Feedback', feedbackSchema);
