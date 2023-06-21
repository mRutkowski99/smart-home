import { Injectable } from '@nestjs/common';
import {
  SceneCreatedEvent,
  SceneUpdatedEvent,
} from '@smart-home/shared/scene/util-scene-event';
import {
  ControlDeviceService,
  Job,
  SceneJobsService,
} from '@smart-home/smart-hub/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';
import {ApiControllerPrefix, getControllerUrl, HOME_ID_HEADER_KEY} from '@smart-home/shared/util';

@Injectable()
export class SmartHubSceneService {
  constructor(
    private jobService: SceneJobsService,
    private scheduler: SchedulerRegistry,
    private deviceControlService: ControlDeviceService,
    private httpService: HttpService
  ) {}

  handleSceneCreated(event: SceneCreatedEvent) {
    console.log(JSON.stringify(event))
    this.jobService.add(event.sceneId, event.jobs);

    event.cron.forEach((cron) => {
      const cronJob = new CronJob(cron, () => {
        event.jobs.forEach((job) => this.handleJob(job));
        this.httpService.put(
          `${getControllerUrl(ApiControllerPrefix.Scene)}/${
            event.sceneId
          }/state`,
          { state: true },
          { headers: {[HOME_ID_HEADER_KEY]: event.homeId} }
        );
      });

      this.scheduler.addCronJob(
        `${event.sceneId}-${this.getCronDay(cron)}`,
        cronJob
      );

      if (event.scheduleActivated) cronJob.start();
    });
  }

  handleSceneActivated(sceneId: string) {
    const jobs = this.jobService.get(sceneId);
    jobs?.forEach((job) => this.handleJob(job));
  }

  handleSceneDeleted(sceneId: string) {
    this.jobService.delete(sceneId);
    Array.from(this.scheduler.getCronJobs().keys())
      .filter((name) => name.startsWith(sceneId))
      .forEach((name) => this.scheduler.deleteCronJob(name));
  }

  handleSceneUpdated(event: SceneUpdatedEvent) {
    this.jobService.update(event.sceneId, event.jobs);

    Array.from(this.scheduler.getCronJobs().keys())
      .filter((name) => name.startsWith(event.sceneId))
      .forEach((name) => this.scheduler.deleteCronJob(name));

    event.cron.forEach((cron) => {
      const cronJob = new CronJob(cron, () => {
        event.jobs.forEach((job) => this.handleJob(job));
      });

      this.scheduler.addCronJob(
        `${event.sceneId}-${this.getCronDay(cron)}`,
        cronJob
      );

      if (event.scheduleActivated) cronJob.start();
    });
  }

  private handleJob(job: Job) {
    this.deviceControlService.writeDigital(job.state.value, job.state.address);
    this.deviceControlService.writeAnalog(
      job.setpoint.value,
      job.setpoint.address
    );
  }

  private getCronDay(cron: string) {
    return cron.slice(-1);
  }
}
