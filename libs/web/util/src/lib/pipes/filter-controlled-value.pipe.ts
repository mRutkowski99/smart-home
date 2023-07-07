import {Pipe, PipeTransform} from "@angular/core";
import {ControlledValue} from "@prisma/client";

@Pipe({name: 'filterControlledValue', standalone: true})
export class FilterControlledValuePipe implements PipeTransform {
    transform(value: ControlledValue[], assigned: (ControlledValue | null | undefined)[] | null): ControlledValue[] {
        if (!assigned) return value
        return value.filter(v => !assigned.includes(v))
    }
}