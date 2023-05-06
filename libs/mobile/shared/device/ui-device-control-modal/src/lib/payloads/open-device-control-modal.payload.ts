export interface OpenDeviceControlModalPayload {
  readonly name: string;
  readonly setpoint: number;
  readonly state: boolean;
  readonly min: number;
  readonly max: number;
  readonly step: number;
}
