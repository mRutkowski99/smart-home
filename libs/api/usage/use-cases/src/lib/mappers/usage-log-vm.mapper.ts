import {Injectable} from "@nestjs/common";
import {UsageLog} from "@smart-home/api/usage/domain";
import {UsageLogVm} from "@smart-home/shared/usage/util-usage-vm";

@Injectable()
export class UsageLogVmMapper {
    map(domain: UsageLog): UsageLogVm {
        return {
            id: domain.id.value,
            homeId: domain.homeId.value,
            value: domain.value,
            date: domain.date
        }
    }

    mapAll(domain: UsageLog[]): UsageLogVm[] {
        return domain.map(this.map)
    }
}