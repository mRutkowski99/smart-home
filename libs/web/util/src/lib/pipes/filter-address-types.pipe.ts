import {Pipe, PipeTransform} from "@angular/core";
import {AddressType, ControlledValue} from "@prisma/client";

@Pipe({name: 'filterAddressTypes', standalone: true})
export class FilterAddressTypesPipe implements PipeTransform {
    transform(value: AddressType[], controlledValue: ControlledValue | null): AddressType[] {
        if (!controlledValue) return value;
        if (controlledValue === 'READ_VALUE') return ['DI', 'AI']
        if (controlledValue === 'WRITE_STATE') return ['DO']
        if (controlledValue === 'WRITE_SETPOINT') return ['DO', 'AO']
        else throw new Error('Unknown value')
    }

}