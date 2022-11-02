export class UpdateActiveForAllCommand {
  constructor(
    public readonly homeId: string,
    public readonly state: 'active' | 'default'
  ) {}
}
