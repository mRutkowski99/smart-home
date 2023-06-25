import {Injectable} from "@nestjs/common";
import {Alarm} from "@smart-home/api/alarm/domain";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";

@Injectable()
export class AlarmOverviewVmMapper {
    map(domain: Alarm): AlarmOverviewVm {
        return {
            homeId: domain.homeId.value,
            id: domain.id.value,
            status: domain.status,
            state: domain.state
        }
    }
}