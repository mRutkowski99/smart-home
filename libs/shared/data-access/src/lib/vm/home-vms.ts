export interface HomeVm {
  id: number;
  city: string;
}

export interface RoomVm {
  id: number;
  homeId: number;
  name: string;
  state: boolean;
}

export interface HomeWithRoomsVm extends HomeVm {
  rooms: RoomVm[];
}
