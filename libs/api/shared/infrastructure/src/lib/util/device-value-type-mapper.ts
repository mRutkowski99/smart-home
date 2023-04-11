import { DeviceValueType } from '@smart-home/api/shared/domain';
import { ValueType } from '@prisma/client';

export function deviceValueTypeMapper(dbValue: ValueType): DeviceValueType {
  if (dbValue === 'DIGITAL') return DeviceValueType.DIGITAL;
  if (dbValue === 'PERCENT') return DeviceValueType.PERCENT;
  if (dbValue === 'TEMPERATURE') return DeviceValueType.TEMPERATURE;
  else throw new Error('Invalid device setpoint valueType');
}
