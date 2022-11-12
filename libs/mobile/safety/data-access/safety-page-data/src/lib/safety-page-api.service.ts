import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafetyDto } from '@smart-home/shared/dto';
import { ApiUrlUtil } from '@smart-home/shared/utils';

@Injectable()
export class SafetyPageApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.safetyController;

  getAll(homeId: string): Observable<SafetyDto[]> {
    return this.http.get<SafetyDto[]>(this.url + 'all/' + homeId);
  }
}
