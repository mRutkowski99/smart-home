import { CommunicationType } from '@prisma/client';
import { Device } from './device.entity';
import { TemperatureValue } from './value-objects/temperature-value.model';

const ECO_MIN_TEMP = 21;
const ECO_MAX_TEMP = 27;

export class TemperatureDevice extends Device<TemperatureValue> {
  constructor(
    id: string,
    roomId: string,
    name: string,
    setpoint: TemperatureValue,
    address: string,
    communication: CommunicationType,
    public readonly state: boolean,
    public readonly heatingTemperature: TemperatureValue,
    public readonly coolingTemperature: TemperatureValue
  ) {
    super(id, roomId, name, 'Temperature', setpoint, address, communication);
  }

  getEcoTemperature(outsideTemperature: TemperatureValue): TemperatureValue {
    const value = outsideTemperature.value;
    if (value < ECO_MIN_TEMP) return new TemperatureValue(ECO_MIN_TEMP);
    else if (value > ECO_MAX_TEMP) return new TemperatureValue(ECO_MAX_TEMP);
    else return new TemperatureValue(value);
  }
}
