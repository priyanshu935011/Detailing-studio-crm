import { Router } from 'express';
import { membershipController } from '../controllers/membershipController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, membershipCreateSchema, membershipUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(membershipController.list));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(membershipController.getById));
router.post('/', validateRequest(membershipCreateSchema), asyncHandler(membershipController.create));
router.put('/:id', validateRequest(membershipUpdateSchema), asyncHandler(membershipController.update));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(membershipController.remove));

export default router;
