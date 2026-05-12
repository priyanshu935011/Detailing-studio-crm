import { createCrudController } from './resourceControllerFactory';
import { StaffService } from '../services/staffService';

const staffService = new StaffService();

export const staffController = createCrudController(staffService);
