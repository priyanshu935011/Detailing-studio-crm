import { StaffModel } from '../models/Staff';
import { UserModel, UserRole } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { comparePassword, hashPassword, signToken } from '../utils/auth';

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export class AuthService {
  async register(payload: RegisterPayload) {
    const existingUser = await UserModel.findOne({ email: payload.email });

    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const password = await hashPassword(payload.password);
    const user = await UserModel.create({ ...payload, password });
    await StaffModel.create({
      userId: user._id,
      name: payload.name,
      role: payload.role,
      phone: payload.phone,
      email: payload.email
    });

    const token = signToken({ userId: user.id, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = signToken({ userId: user.id, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
