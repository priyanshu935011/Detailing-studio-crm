import { Router } from 'express';
import {
  getCustomerFrequencyReport,
  getOverviewReport,
  getRevenueReport,
  getServiceUsageReport
} from '../controllers/reportController';
import { authenticate } from '../middlewares/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authenticate);
router.get('/overview', asyncHandler(getOverviewReport));
router.get('/revenue', asyncHandler(getRevenueReport));
router.get('/service-usage', asyncHandler(getServiceUsageReport));
router.get('/customer-frequency', asyncHandler(getCustomerFrequencyReport));

export default router;
