import { FilterFromParam } from '@smart-home/api/core/utils';

export class GetSafetyWithLogsQuery {
  constructor(
    public readonly id: string,
    public readonly from: FilterFromParam,
    public readonly onlyDanger: boolean
  ) {}
}
