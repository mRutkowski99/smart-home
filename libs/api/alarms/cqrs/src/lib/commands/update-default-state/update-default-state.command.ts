export class UpdateDefaultStateCommand {
  constructor(
    public readonly id: string,
    public readonly newDefaultState: boolean
  ) {}
}
