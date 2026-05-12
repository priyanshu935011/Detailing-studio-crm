import { Request, Response } from 'express';
import { CustomerService } from '../services/customerService';
import { createResponse } from '../utils/apiResponse';
import { createCrudController } from './resourceControllerFactory';

const customerService = new CustomerService();

const baseController = createCrudController(customerService);

export const customerController = {
  ...baseController,
  getById: async (req: Request, res: Response) => {
    const result = await customerService.getCustomerDetails(String(req.params.id));
    res.json(createResponse(result, 'Customer fetched successfully'));
  }
};
