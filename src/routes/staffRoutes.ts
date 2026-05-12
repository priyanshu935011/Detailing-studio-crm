import { Router } from 'express';
import { staffController } from '../controllers/staffController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, staffCreateSchema, staffUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/', validateRequest(paginationSchema), asyncHandler(staffController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(staffController.getById));
router.post('/', validateRequest(staffCreateSchema), asyncHandler(staffController.create));
router.put('/:id', validateRequest(staffUpdateSchema), asyncHandler(staffController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(staffController.remove));

export default router;
