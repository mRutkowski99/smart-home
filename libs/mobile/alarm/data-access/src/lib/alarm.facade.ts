import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AlarmState} from "./state/alarm.reducer";
import {alarmSelectors} from "./state/alarm.selectors";
import {AlarmActions} from "./state/alarm.actions";

@Injectable()
export class AlarmFacade {
    constructor(private store: Store<AlarmState>) {
    }

    alarmVm$ = this.store.select(alarmSelectors.alarmVmSelector)

    getAlarms() {
        this.store.dispatch(AlarmActions.getAlarm())
    }

    updateAlarmState(id: string, value: boolean) {
        this.store.dispatch(AlarmActions.updateAlarmState({id, value}))
    }
}