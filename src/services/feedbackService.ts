import { Feedback, FeedbackModel } from '../models/Feedback';
import { BaseCrudService } from './baseCrudService';

export class FeedbackService extends BaseCrudService<Feedback> {
  constructor() {
    super(FeedbackModel);
  }
}
