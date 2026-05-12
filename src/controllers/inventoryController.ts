import { createCrudController } from './resourceControllerFactory';
import { InventoryService } from '../services/inventoryService';

const inventoryService = new InventoryService();

export const inventoryController = createCrudController(inventoryService);
