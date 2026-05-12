import { Router } from 'express';
import { customerController } from '../controllers/customerController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { customerCreateSchema, customerUpdateSchema, idParamSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(customerController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(customerController.getById));
router.post('/', validateRequest(customerCreateSchema), asyncHandler(customerController.create));
router.put('/:id', validateRequest(customerUpdateSchema), asyncHandler(customerController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(customerController.remove));

export default router;
