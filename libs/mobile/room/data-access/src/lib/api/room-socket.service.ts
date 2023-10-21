import {Injectable} from "@angular/core";
import {WebsocketService} from "@smart-home/mobile/shared/util";
import {Store} from "@ngrx/store";
import {RoomState} from "../state/room.reducer";

@Injectable()
export class RoomSocketService extends WebsocketService{
    constructor(private store: Store<RoomState>) {
        super('ws://localhost:8080/room');
    }
}