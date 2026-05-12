import { Router } from 'express';
import appointmentRoutes from './appointmentRoutes';
import authRoutes from './authRoutes';
import customerRoutes from './customerRoutes';
import feedbackRoutes from './feedbackRoutes';
import inventoryRoutes from './inventoryRoutes';
import invoiceRoutes from './invoiceRoutes';
import jobCardRoutes from './jobCardRoutes';
import membershipRoutes from './membershipRoutes';
import notificationRoutes from './notificationRoutes';
import reportRoutes from './reportRoutes';
import serviceCatalogRoutes from './serviceCatalogRoutes';
import staffRoutes from './staffRoutes';
import vehicleRoutes from './vehicleRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/job-cards', jobCardRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/services', serviceCatalogRoutes);
router.use('/staff', staffRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/memberships', membershipRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRoutes);

export default router;
