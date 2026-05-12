import { HydratedDocument, Schema, model } from 'mongoose';

export type UserRole = 'admin' | 'staff';

export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' }
  },
  { timestamps: true }
);
export type UserDocument = HydratedDocument<User>;
export const UserModel = model<User>('User', userSchema);
