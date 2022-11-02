export class ConfirmLogCommand {
  constructor(
    public readonly id: string,
    public readonly logId: string,
    public readonly userId: string
  ) {}
}
