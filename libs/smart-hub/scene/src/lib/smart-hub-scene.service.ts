import {Injectable, OnModuleInit} from '@nestjs/common';
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
import {firstValueFrom} from "rxjs";

@Injectable()
export class SmartHubSceneService implements OnModuleInit {
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

        const resp = firstValueFrom(this.httpService.put(
            `${getControllerUrl(ApiControllerPrefix.Scene)}/${
                event.sceneId
            }/started`,
            {},
            { headers: {[HOME_ID_HEADER_KEY]: event.homeId} }
        )).then(console.log).catch(console.log)
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
        const resp = firstValueFrom(this.httpService.put(
            `${getControllerUrl(ApiControllerPrefix.Scene)}/${
                event.sceneId
            }/started`,
            {},
            { headers: {[HOME_ID_HEADER_KEY]: event.homeId} }
        )).then(console.log).catch(console.log)

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

  onModuleInit() {
    // const resp = firstValueFrom(this.httpService.put(
    //     `${getControllerUrl(ApiControllerPrefix.Scene)}/${
    //         123
    //     }/started`,
    //     {},
    //     { headers: {[HOME_ID_HEADER_KEY]: 123} }
    // )).then(console.log).catch(console.log)

  }
}
