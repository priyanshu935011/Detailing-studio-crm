import { Router } from 'express';
import { login, profile, register } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { loginSchema, registerSchema } from '../validators/authValidators';

const router = Router();

router.post('/register', validateRequest(registerSchema), asyncHandler(register));
router.post('/login', validateRequest(loginSchema), asyncHandler(login));
router.get('/me', authenticate, asyncHandler(profile));

export default router;
