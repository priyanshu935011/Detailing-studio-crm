import { Router } from 'express';
import { vehicleController } from '../controllers/vehicleController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, vehicleCreateSchema, vehicleUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(vehicleController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(vehicleController.getById));
router.post('/', validateRequest(vehicleCreateSchema), asyncHandler(vehicleController.create));
router.put('/:id', validateRequest(vehicleUpdateSchema), asyncHandler(vehicleController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(vehicleController.remove));

export default router;
