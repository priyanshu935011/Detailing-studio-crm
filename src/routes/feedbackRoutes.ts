import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { feedbackCreateSchema, feedbackUpdateSchema, idParamSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(feedbackController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(feedbackController.getById));
router.post('/', validateRequest(feedbackCreateSchema), asyncHandler(feedbackController.create));
router.put('/:id', validateRequest(feedbackUpdateSchema), asyncHandler(feedbackController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(feedbackController.remove));

export default router;
