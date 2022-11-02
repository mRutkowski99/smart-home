export class CreateLogCommand {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly danger: boolean
  ) {}
}
