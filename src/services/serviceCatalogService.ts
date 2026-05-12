import { ServiceCatalog, ServiceCatalogModel } from '../models/ServiceCatalog';
import { BaseCrudService } from './baseCrudService';

export class ServiceCatalogService extends BaseCrudService<ServiceCatalog> {
  constructor() {
    super(ServiceCatalogModel);
  }
}
