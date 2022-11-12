export class CreateSafetyLogCommand {
  constructor(
    public readonly id: string,
    public readonly disabled: boolean,
    public readonly danger: boolean
  ) {}
}
