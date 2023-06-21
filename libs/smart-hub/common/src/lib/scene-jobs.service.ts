import { Injectable } from '@nestjs/common';
import { Job } from './job.interface';

@Injectable()
export class SceneJobsService {
  private jobs = new Map<string, Job[]>();

  add(sceneId: string, jobs: Job[]): void {
    this.jobs.set(sceneId, jobs);
  }

  get(sceneId: string): Job[] | undefined {
    return this.jobs.get(sceneId);
  }

  delete(sceneId: string): void {
    this.jobs.delete(sceneId);
  }

  update(sceneId: string, jobs: Job[]): void {
    this.jobs.delete(sceneId);
    this.jobs.set(sceneId, jobs);
  }
}
