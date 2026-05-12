import { Router } from 'express';
import { invoiceController } from '../controllers/invoiceController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, invoiceCreateSchema, invoiceUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(invoiceController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(invoiceController.getById));
router.post('/', validateRequest(invoiceCreateSchema), asyncHandler(invoiceController.create));
router.put('/:id', validateRequest(invoiceUpdateSchema), asyncHandler(invoiceController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(invoiceController.remove));

export default router;
