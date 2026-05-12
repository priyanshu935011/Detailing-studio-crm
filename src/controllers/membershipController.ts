import { createCrudController } from './resourceControllerFactory';
import { MembershipService } from '../services/membershipService';

const membershipService = new MembershipService();

export const membershipController = createCrudController(membershipService);
