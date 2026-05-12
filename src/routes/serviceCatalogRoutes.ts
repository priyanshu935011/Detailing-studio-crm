import { Router } from 'express';
import { serviceCatalogController } from '../controllers/serviceCatalogController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, serviceCreateSchema, serviceUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(serviceCatalogController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(serviceCatalogController.getById));
router.post('/', validateRequest(serviceCreateSchema), asyncHandler(serviceCatalogController.create));
router.put('/:id', validateRequest(serviceUpdateSchema), asyncHandler(serviceCatalogController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(serviceCatalogController.remove));

export default router;
