export class RoomOverviewDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly devicesCount: number,
    public readonly imgUrl: string
  ) {}
}

export class RoomDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly temperature: number,
    public readonly humidity: number
  ) {}
}
