import { IsBoolean, IsDefined } from 'class-validator';

export class ToggleSceneFavouriteRequest {
  @IsBoolean()
  @IsDefined()
  public readonly value: boolean;
}

export class ToggleSceneActiveRequest {
  @IsBoolean()
  @IsDefined()
  public readonly value: boolean;
}
