import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomOverviewDto } from '@smart-home/shared/dto';
import { Observable } from 'rxjs';
import { environment } from 'apps/mobile/src/environments/environment';
import { ToggleRoomFavouriteRequest } from '@smart-home/shared/requests';

@Injectable()
export class RoomsListApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = environment.apiUrl + 'room/';

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
