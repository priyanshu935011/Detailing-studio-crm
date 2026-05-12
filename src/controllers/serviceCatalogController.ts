import { createCrudController } from './resourceControllerFactory';
import { ServiceCatalogService } from '../services/serviceCatalogService';

const serviceCatalogService = new ServiceCatalogService();

export const serviceCatalogController = createCrudController(serviceCatalogService);
