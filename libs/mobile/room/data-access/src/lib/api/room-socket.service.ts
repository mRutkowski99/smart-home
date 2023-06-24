import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {RoomState} from "../state/room.reducer";


@Injectable()
export class RoomSocketService  {
    constructor(private socket: Socket, private store: Store<RoomState>) {
    }
}