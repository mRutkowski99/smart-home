export class UpdateFavouriteCommand {
  constructor(
    public readonly roomId: string,
    public readonly newValue: boolean
  ) {}
}
