import { createCrudController } from './resourceControllerFactory';
import { NotificationService } from '../services/notificationService';

const notificationService = new NotificationService();

export const notificationController = createCrudController(notificationService);
