import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlarmWithLogsDto } from '@smart-home/shared/dto';
import { GetAlarmWithLogsQuery } from '@smart-home/shared/requests';
import { ApiUrlUtil } from '@smart-home/shared/utils';
import { Observable } from 'rxjs';

export type FromType = 'lastWeek' | 'lastMonth' | 'lastThreeMonths';

@Injectable()
export class AlarmDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.alarmsController;

  getLogs(
    id: string,
    onlyDanger: boolean,
    from: FromType
  ): Observable<AlarmWithLogsDto> {
    const query = new GetAlarmWithLogsQuery(onlyDanger, from);
    console.log(query);

    return this.http.get<AlarmWithLogsDto>(this.url + id + '/logs', {
      params: new HttpParams({ fromObject: query.toQueryParams() }),
    });
  }
}
