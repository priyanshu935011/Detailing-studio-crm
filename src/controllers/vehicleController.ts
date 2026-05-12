import { createCrudController } from './resourceControllerFactory';
import { VehicleService } from '../services/vehicleService';

const vehicleService = new VehicleService();

export const vehicleController = createCrudController(vehicleService);
