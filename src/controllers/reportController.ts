import { Request, Response } from 'express';
import { ReportService } from '../services/reportService';
import { createResponse } from '../utils/apiResponse';

const reportService = new ReportService();

export const getOverviewReport = async (_req: Request, res: Response): Promise<void> => {
  const result = await reportService.getOverview();
  res.json(createResponse(result, 'Overview fetched successfully'));
};

export const getRevenueReport = async (_req: Request, res: Response): Promise<void> => {
  const result = await reportService.revenueByDate();
  res.json(createResponse(result, 'Revenue report fetched successfully'));
};

export const getServiceUsageReport = async (_req: Request, res: Response): Promise<void> => {
  const result = await reportService.serviceUsageStats();
  res.json(createResponse(result, 'Service usage report fetched successfully'));
};

export const getCustomerFrequencyReport = async (_req: Request, res: Response): Promise<void> => {
  const result = await reportService.customerFrequency();
  res.json(createResponse(result, 'Customer frequency report fetched successfully'));
};
