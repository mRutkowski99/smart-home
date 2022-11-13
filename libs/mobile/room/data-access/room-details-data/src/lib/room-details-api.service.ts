import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlUtil } from '@smart-home/shared/utils';

@Injectable()
export class RoomDetailsApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.roomController;
}
