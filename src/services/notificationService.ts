import { Notification, NotificationModel } from '../models/Notification';
import { BaseCrudService } from './baseCrudService';

export class NotificationService extends BaseCrudService<Notification> {
  constructor() {
    super(NotificationModel);
  }

  async createSystemEvent(payload: Partial<Notification>) {
    return this.create(payload);
  }
}
