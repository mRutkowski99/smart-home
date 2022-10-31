import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomOverviewDto } from '@smart-home/shared/dto';
import { ApiUrlUtil } from '@smart-home/shared/utils';

@Injectable()
export class RoomsListApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.roomController;

  getRooms(homeId: string): Observable<RoomOverviewDto[]> {
    return this.http.get<RoomOverviewDto[]>(this.url + 'overviews/' + homeId);
  }

  // updateFavourite(id: string, value: boolean) {
  //   return this.http.patch(
  //     this.url + id + '/toggleFavourite',
  //     new ToggleRoomFavouriteRequest(value)
  //   );
  // }
}
