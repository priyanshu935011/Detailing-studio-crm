import { JobCard, JobCardModel } from '../models/JobCard';
import { BaseCrudService } from './baseCrudService';

export class JobCardService extends BaseCrudService<JobCard> {
  constructor() {
    super(JobCardModel);
  }

  async create(payload: Partial<JobCard>) {
    return super.create({
      ...payload,
      media: payload.media ?? []
    });
  }
}
