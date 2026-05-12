import { createCrudController } from './resourceControllerFactory';
import { FeedbackService } from '../services/feedbackService';

const feedbackService = new FeedbackService();

export const feedbackController = createCrudController(feedbackService);
