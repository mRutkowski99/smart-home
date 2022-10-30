import { IsBoolean } from 'class-validator';

export class ToggleRoomFavouriteRequest {
  @IsBoolean()
  public readonly value: boolean;
}
