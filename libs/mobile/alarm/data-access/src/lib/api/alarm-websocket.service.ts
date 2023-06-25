import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Store} from "@ngrx/store";
import {AlarmState} from "../state/alarm.reducer";
import {AlarmStatusChangedEvent} from "@smart-home/shared/alarm/util-alarm-event";
import {AlarmActions} from "../state/alarm.actions";

@Injectable()
export class AlarmWebsocketService {
    constructor(private socket: Socket, private store: Store<AlarmState>) {
        this.registerHandlers()
    }

    private registerHandlers() {
        this.socket.on(AlarmStatusChangedEvent.pattern, () => this.store.dispatch(AlarmActions.getAlarm()))
    }
}