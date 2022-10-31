import { IsBoolean, IsDefined } from 'class-validator';

export class ToggleRoomFavouriteRequest {
  @IsBoolean()
  @IsDefined()
  public readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }
}
