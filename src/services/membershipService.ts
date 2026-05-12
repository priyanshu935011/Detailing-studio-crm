import { Membership, MembershipModel } from '../models/Membership';
import { BaseCrudService } from './baseCrudService';

export class MembershipService extends BaseCrudService<Membership> {
  constructor() {
    super(MembershipModel);
  }
}
