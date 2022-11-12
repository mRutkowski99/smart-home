import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FromType } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { SafetyWithLogsDto } from '@smart-home/shared/dto';
import { GetWithLogsQuery } from '@smart-home/shared/requests';
import { ApiUrlUtil } from '@smart-home/shared/utils';
import { Observable } from 'rxjs';

@Injectable()
export class SafetyDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.safetyController;

  getDetails(
    id: string,
    onlyDanger: boolean,
    from: FromType
  ): Observable<SafetyWithLogsDto> {
    const query = new GetWithLogsQuery(onlyDanger, from);

    return this.http.get<SafetyWithLogsDto>(this.url + id + '/logs', {
      params: new HttpParams({ fromObject: query.toQueryParams() }),
    });
  }
}
