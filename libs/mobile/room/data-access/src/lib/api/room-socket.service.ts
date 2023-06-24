import {WebsocketService} from "@smart-home/mobile/shared/util";
import {Injectable} from "@angular/core";

@Injectable()
export class RoomSocketService extends WebsocketService {
    constructor() {
        super();
        this.events$.subscribe(console.log)
    }
}