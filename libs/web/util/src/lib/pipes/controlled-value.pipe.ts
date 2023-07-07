import {Pipe, PipeTransform} from "@angular/core";
import {ControlledValue} from "@prisma/client";

@Pipe({name: 'controlledValueTransform', standalone: true})
export class ControlledValuePipe implements PipeTransform {
    transform(value: ControlledValue): string {
        if (value === 'READ_VALUE') return 'Read value'
        if (value === 'WRITE_SETPOINT') return 'Write setpoint'
        if (value === 'WRITE_STATE') return 'Write state'
        else throw new Error('Invalid value')
    }

}