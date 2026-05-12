import { Router } from 'express';
import { inventoryController } from '../controllers/inventoryController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, inventoryCreateSchema, inventoryUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(inventoryController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(inventoryController.getById));
router.post('/', validateRequest(inventoryCreateSchema), asyncHandler(inventoryController.create));
router.put('/:id', validateRequest(inventoryUpdateSchema), asyncHandler(inventoryController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(inventoryController.remove));

export default router;
