import { FilterQuery, HydratedDocument, Model } from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { ensureObjectId } from '../utils/objectId';
import { paginateQuery, parsePagination } from '../utils/pagination';

export class BaseCrudService<T> {
  constructor(protected model: Model<T>) {}

  async list(
    query: Record<string, unknown>,
    filter: FilterQuery<T> = {},
    sort: Record<string, 1 | -1> = { createdAt: -1 }
  ): Promise<unknown> {
    const { page, limit } = parsePagination(query);
    return paginateQuery(this.model, filter, page, limit, sort);
  }

  async getById(id: string): Promise<HydratedDocument<T>> {
    ensureObjectId(id);
    const item = await this.model.findById(id);
    if (!item) {
      throw new ApiError(404, 'Resource not found');
    }
    return item;
  }

  async create(payload: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(payload);
  }

  async update(id: string, payload: Partial<T>): Promise<HydratedDocument<T>> {
    ensureObjectId(id);
    const item = await this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!item) {
      throw new ApiError(404, 'Resource not found');
    }
    return item;
  }

  async delete(id: string): Promise<HydratedDocument<T>> {
    ensureObjectId(id);
    const item = await this.model.findByIdAndDelete(id);
    if (!item) {
      throw new ApiError(404, 'Resource not found');
    }
    return item;
  }
}
