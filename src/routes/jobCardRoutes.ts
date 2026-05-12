import { Router } from 'express';
import {
  createJobCard,
  deleteJobCard,
  getJobCard,
  listJobCards,
  updateJobCard
} from '../controllers/jobCardController';
import { authenticate } from '../middlewares/auth';
import { upload } from '../middlewares/upload';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { paginationSchema } from '../validators/commonValidators';
import { idParamSchema, jobCardCreateSchema, jobCardUpdateSchema } from '../validators/moduleValidators';

const router = Router();

router.use(authenticate);
router.get('/', validateRequest(paginationSchema), asyncHandler(listJobCards));
router.get('/:id', validateRequest(idParamSchema), asyncHandler(getJobCard));
router.post('/', upload.array('media', 10), validateRequest(jobCardCreateSchema), asyncHandler(createJobCard));
router.put('/:id', upload.array('media', 10), validateRequest(jobCardUpdateSchema), asyncHandler(updateJobCard));
router.delete('/:id', validateRequest(idParamSchema), asyncHandler(deleteJobCard));

export default router;
