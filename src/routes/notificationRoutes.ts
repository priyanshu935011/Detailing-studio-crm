import { Router } from 'express';
import { notificationController } from '../controllers/notificationController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, notificationUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(notificationController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(notificationController.getById));
router.post('/', asyncHandler(notificationController.create));
router.put('/:id', validateRequest(notificationUpdateSchema), asyncHandler(notificationController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(notificationController.remove));

export default router;
