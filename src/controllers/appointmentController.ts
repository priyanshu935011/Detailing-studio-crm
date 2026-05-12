import { createCrudController } from './resourceControllerFactory';
import { AppointmentService } from '../services/appointmentService';

const appointmentService = new AppointmentService();

export const appointmentController = createCrudController(appointmentService);
