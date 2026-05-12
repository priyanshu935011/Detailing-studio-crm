import { createCrudController } from './resourceControllerFactory';
import { InvoiceService } from '../services/invoiceService';

const invoiceService = new InvoiceService();

export const invoiceController = createCrudController(invoiceService);
