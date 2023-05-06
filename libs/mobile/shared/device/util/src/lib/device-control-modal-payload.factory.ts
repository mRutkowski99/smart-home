import { RoomDevice } from '@smart-home/shared/room/util-room-vm';
import { OpenDeviceControlModalPayload } from '@smart-home/mobile/shared/device/ui-device-control-modal';
import { DeviceValueType } from '@smart-home/shared/util';

const getMin = (valueType: DeviceValueType): number => {
  if (valueType === 'TEMPERATURE') return 12;
  if (valueType === 'PERCENT') return 0;

  throw new Error('Wrong device type');
};

const getMax = (valueType: DeviceValueType): number => {
  if (valueType === 'TEMPERATURE') return 35;
  if (valueType === 'PERCENT') return 100;

  throw new Error('Wrong device type');
};

const getStep = (valueType: DeviceValueType): number => {
  if (valueType === 'TEMPERATURE') return 0.5;
  if (valueType === 'PERCENT') return 5;

  throw new Error('Wrong device type');
};

export const getDeviceValueControlModalPayload = (
  device: RoomDevice
): OpenDeviceControlModalPayload => ({
  ...device,
  min: getMin(device.valueType),
  max: getMax(device.valueType),
  step: getStep(device.valueType),
});
