import { Injectable } from "@nestjs/common";
import {Alarm} from "@smart-home/api/alarm/domain";
import {AlarmDetailsVm} from "@smart-home/shared/alarm/util-alarm-vm";

@Injectable()
export class AlarmDetailVmMapper {
    map(domain: Alarm | null): AlarmDetailsVm | null {
        if (!domain) return null

        return {
            id: domain.id.value,
            stateAddress: domain.stateAddress,
            stateAddressType: domain.stateAddressType,
            statusAddress: domain.statusAddress,
            statusAddressType: domain.statusAddressType,
        }
    }

    mapAll(domain: Alarm[]): AlarmDetailsVm[] {
        return domain.map(this.map)
    }
}