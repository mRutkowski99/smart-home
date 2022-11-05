import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlarmDto, AlarmWithLogsDto } from '@smart-home/shared/dto';
import {
  ConfirmLogBody,
  GetAlarmWithLogsQuery,
  UpdateActiveBody,
  UpdateDefaultStateBody,
} from '@smart-home/shared/requests';
import { ApiUrlUtil } from '@smart-home/shared/utils';
import { Observable } from 'rxjs';

export type FromType = 'lastWeek' | 'lastMonth' | 'lastThreeMonths';

@Injectable()
export class AlarmsPageApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.alarmsController;

  getAlarms(homeId: string): Observable<AlarmDto[]> {
    return this.http.get<AlarmDto[]>(this.url + 'all/' + homeId);
  }

  getLogs(
    id: string,
    onlyDanger: boolean,
    from: FromType
  ): Observable<AlarmWithLogsDto> {
    const query = new GetAlarmWithLogsQuery(onlyDanger, from);

    return this.http.get<AlarmWithLogsDto>(this.url + id + '/logs', {
      params: new HttpParams({ fromObject: query.toQueryParams() }),
    });
  }

  confirmLog(id: string, logId: string, userId: string) {
    return this.http.patch(
      this.url + id + '/confirm',
      new ConfirmLogBody(logId, userId)
    );
  }

  updateDefaultState(id: string, state: boolean) {
    return this.http.patch(
      this.url + id + '/defaultState',
      new UpdateDefaultStateBody(state)
    );
  }

  updateState(id: string, state: boolean) {
    return this.http.patch(
      this.url + id + '/state',
      new UpdateActiveBody(state)
    );
  }

  updateStateForAll(homeId: string, state: boolean) {
    return this.http.patch(
      this.url + 'all/home/' + homeId + '/state',
      new UpdateActiveBody(state)
    );
  }
}
