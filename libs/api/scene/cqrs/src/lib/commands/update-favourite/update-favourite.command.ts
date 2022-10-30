export class UpdateFavouriteCommand {
  constructor(public readonly id: string, public readonly newValue: boolean) {}
}
