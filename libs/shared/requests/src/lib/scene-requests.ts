import { IsBoolean } from 'class-validator';

export class ToggleSceneFavouriteRequest {
  @IsBoolean()
  public readonly value: boolean;
}
