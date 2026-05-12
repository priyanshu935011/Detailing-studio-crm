import { Inventory, InventoryModel } from '../models/Inventory';
import { BaseCrudService } from './baseCrudService';

export class InventoryService extends BaseCrudService<Inventory> {
  constructor() {
    super(InventoryModel);
  }

  async list(query: Record<string, unknown>) {
    const data = (await super.list(query)) as {
      items: Inventory[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    return {
      ...data,
      lowStockItems: data.items.filter((item) => item.quantity <= item.threshold)
    };
  }
}
