import {AlarmSchema} from "@prisma/client";
import {Alarm} from "@smart-home/api/alarm/domain";
import {Uuid} from "@smart-home/api/shared/domain";

export function alarmFactory(schema: AlarmSchema | null): Alarm {
    if (!schema) return null
    return new Alarm(
        new Uuid(schema.id),
        new Uuid(schema.homeId),
        schema.state,
        schema.stateAddress,
        schema.stateAddressType,
        schema.status,
        schema.statusAddress,
        schema.statusAddressType
    )
}