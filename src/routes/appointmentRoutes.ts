import { Router } from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { appointmentCreateSchema, appointmentUpdateSchema, idParamSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(appointmentController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(appointmentController.getById));
router.post('/', validateRequest(appointmentCreateSchema), asyncHandler(appointmentController.create));
router.put('/:id', validateRequest(appointmentUpdateSchema), asyncHandler(appointmentController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(appointmentController.remove));

export default router;
