import {Pipe, PipeTransform} from "@angular/core";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";

type AlarmStatus = 'ok' | 'disabled' | 'triggered'

@Pipe({name: 'alarmStatus', standalone: true})
export class AlarmStatusPipe implements PipeTransform {
    transform(alarm: AlarmOverviewVm): AlarmStatus {
        if (!alarm.state) return 'disabled'

        if (alarm.state && alarm.status) return 'ok'
        else return 'triggered'
    }

}