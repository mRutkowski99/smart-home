import { Injectable } from '@nestjs/common';
import { AlarmSchema } from '@prisma/client';
import { Alarm } from '@smart-home/api/alarms/domain';

@Injectable()
export class AlarmMapper {}
