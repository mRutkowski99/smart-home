import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafetyWithLogsDto } from '@smart-home/shared/dto';
import { ApiUrlUtil } from '@smart-home/shared/utils';
import { Observable } from 'rxjs';

@Injectable()
export class SafetyDetailsApi {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.safetyController;

  getDetails(id: string): Observable<SafetyWithLogsDto> {
    return this.http.get<SafetyWithLogsDto>(this.url + id + '/logs');
  }
}
