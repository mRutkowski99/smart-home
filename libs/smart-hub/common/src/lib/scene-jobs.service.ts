import { Injectable } from '@nestjs/common';
import { Job } from './job.interface';

@Injectable()
export class SceneJobsService {
  private jobs = new Map<string, Job[]>();

  add(sceneId: string, jobs: Job[]) {
    this.jobs.set(sceneId, jobs);
  }

  get(sceneId: string) {
    return this.jobs.get(sceneId);
  }

  delete(sceneId: string) {
    this.jobs.delete(sceneId);
  }

  update(sceneId: string, jobs: Job[]) {
    this.jobs.delete(sceneId);
    this.jobs.set(sceneId, jobs);
  }
}
