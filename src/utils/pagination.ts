import { FilterQuery, Model } from 'mongoose';

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const parsePagination = (query: Record<string, unknown>): Required<PaginationQuery> => ({
  page: Math.max(Number(query.page) || 1, 1),
  limit: Math.min(Math.max(Number(query.limit) || 10, 1), 100),
  search: String(query.search || '').trim()
});

export const paginateQuery = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  page: number,
  limit: number,
  sort: Record<string, 1 | -1> = { createdAt: -1 }
): Promise<PaginatedResult<T>> => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    model.find(filter).sort(sort).skip(skip).limit(limit),
    model.countDocuments(filter)
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1
  };
};
