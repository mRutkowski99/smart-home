import { IsBoolean, IsDefined } from 'class-validator';

export class ToggleSceneFavouriteRequest {
  @IsBoolean()
  @IsDefined()
  public readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }
}

export class ToggleSceneActiveRequest {
  @IsBoolean()
  @IsDefined()
  public readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }
}
