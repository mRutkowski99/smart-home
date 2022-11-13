import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomDto } from '@smart-home/shared/dto';
import { ApiUrlUtil } from '@smart-home/shared/utils';
import { Observable } from 'rxjs';

@Injectable()
export class RoomDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.roomController;

  getDetails(id: string): Observable<RoomDto> {
    return this.http.get<RoomDto>(this.url + id);
  }
}
