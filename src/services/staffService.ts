import { Staff, StaffModel } from '../models/Staff';
import { BaseCrudService } from './baseCrudService';

export class StaffService extends BaseCrudService<Staff> {
  constructor() {
    super(StaffModel);
  }
}
