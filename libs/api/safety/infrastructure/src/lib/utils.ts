import { InternalServerErrorException } from '@nestjs/common';
import { SafetyDeviceSchemaEnum, SafetyStateSchemaEnum } from '@prisma/client';
import { checkEnumKey } from '@smart-home/api/core/utils';
import {
  SafetyDevice,
  SafetyDeviceEnum,
  SafetyState,
} from '@smart-home/api/safety/domain';

export function mapToDeviceType(type: SafetyDeviceSchemaEnum): SafetyDevice {
  if (!checkEnumKey(SafetyDeviceEnum, type))
    throw new InternalServerErrorException(
      `Key ${type} doesn't exist in SafetyDeviceEnum`
    );

  return new SafetyDevice(SafetyDeviceEnum[type]);
}

export function mapToDeviceSchemaInput(
  type: SafetyDeviceEnum
): SafetyDeviceSchemaEnum {
  if (type === SafetyDeviceEnum.WaterLeakSensor) return 'WaterLeakSensor';
  if (type === SafetyDeviceEnum.COSensor) return 'COSensor';
  return 'SmokeSensor';
}

export function mapToSafetyState(state: SafetyStateSchemaEnum): SafetyState {
  if (!checkEnumKey(SafetyState, state))
    throw new InternalServerErrorException(
      `Key ${state} doesn't exist in SafetyState`
    );

  return SafetyState[state];
}

export function mapToSafetyStateSchemaEnum(
  state: SafetyState
): SafetyStateSchemaEnum {
  if (state === SafetyState.Danger) return 'Danger';
  if (state === SafetyState.Disabled) return 'Disabled';
  return 'Ok';
}
