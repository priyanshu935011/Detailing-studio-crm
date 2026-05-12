import { Request, Response } from 'express';
import { JobCardService } from '../services/jobCardService';
import { createResponse } from '../utils/apiResponse';

const jobCardService = new JobCardService();
const parseServices = (value: unknown) => {
  if (typeof value === 'string') {
    return JSON.parse(value) as Array<{ serviceId: string; name: string; price: number }>;
  }

  return value;
};

export const listJobCards = async (req: Request, res: Response): Promise<void> => {
  const result = await jobCardService.list(req.query);
  res.json(createResponse(result, 'Job cards fetched successfully'));
};

export const getJobCard = async (req: Request, res: Response): Promise<void> => {
  const result = await jobCardService.getById(String(req.params.id));
  res.json(createResponse(result, 'Job card fetched successfully'));
};

export const createJobCard = async (req: Request, res: Response): Promise<void> => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const result = await jobCardService.create({
    ...req.body,
    services: parseServices(req.body.services),
    media: files.map((file) => `/uploads/${file.filename}`)
  });
  res.status(201).json(createResponse(result, 'Job card created successfully'));
};

export const updateJobCard = async (req: Request, res: Response): Promise<void> => {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const current = await jobCardService.getById(String(req.params.id));
  const result = await jobCardService.update(String(req.params.id), {
    ...req.body,
    services: req.body.services ? parseServices(req.body.services) : current.services,
    media: files.length ? [...current.media, ...files.map((file) => `/uploads/${file.filename}`)] : current.media
  });
  res.json(createResponse(result, 'Job card updated successfully'));
};

export const deleteJobCard = async (req: Request, res: Response): Promise<void> => {
  const result = await jobCardService.delete(String(req.params.id));
  res.json(createResponse(result, 'Job card deleted successfully'));
};
