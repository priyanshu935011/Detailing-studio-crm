import { Request, Response } from 'express';
import { createResponse } from '../utils/apiResponse';

interface CrudService<T> {
  list(query: Record<string, unknown>): Promise<unknown>;
  getById(id: string): Promise<unknown>;
  create(payload: Partial<T>): Promise<unknown>;
  update(id: string, payload: Partial<T>): Promise<unknown>;
  delete(id: string): Promise<unknown>;
}

export const createCrudController = <T>(service: CrudService<T>) => ({
  list: async (req: Request, res: Response) => {
    const result = await service.list(req.query);
    res.json(createResponse(result, 'Resources fetched successfully'));
  },
  getById: async (req: Request, res: Response) => {
    const result = await service.getById(String(req.params.id));
    res.json(createResponse(result, 'Resource fetched successfully'));
  },
  create: async (req: Request, res: Response) => {
    const result = await service.create(req.body);
    res.status(201).json(createResponse(result, 'Resource created successfully'));
  },
  update: async (req: Request, res: Response) => {
    const result = await service.update(String(req.params.id), req.body);
    res.json(createResponse(result, 'Resource updated successfully'));
  },
  remove: async (req: Request, res: Response) => {
    const result = await service.delete(String(req.params.id));
    res.json(createResponse(result, 'Resource deleted successfully'));
  }
});
