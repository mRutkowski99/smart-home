import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HomeVm} from "@smart-home/shared/home/util-home-vm";
import {ApiControllerPrefix, getControllerUrl} from "@smart-home/shared/util";
import {CreateHomePayload} from "@smart-home/shared/home/util-home-payload";
import {CreateRoomPayload, UpdateRoomPayload} from "@smart-home/shared/room/util-room-payload";
import {RoomDetailsVm} from "@smart-home/shared/room/util-room-vm";
import {CreateDevicePayload, UpdateDevicePayload} from "@smart-home/shared/device/util-device-payload";
import {AlarmDetailsVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {CreateAlarmPayload} from "@smart-home/shared/alarm/util-alarm-payload";

@Injectable()
export class WebApiService {
    constructor(private http: HttpClient) {
    }

    getHomes(): Observable<HomeVm[]> {
        return this.http.get<HomeVm[]>(getControllerUrl(ApiControllerPrefix.Home));
    }

    createHome(payload: CreateHomePayload) {
        return this.http.post(getControllerUrl(ApiControllerPrefix.Home), payload)
    }

    deleteHome(id: string) {
        return this.http.delete(`${getControllerUrl(ApiControllerPrefix.Home)}/${id}`)
    }


    getRooms(homeId: string): Observable<RoomDetailsVm[]> {
        return this.http.get<RoomDetailsVm[]>(`${getControllerUrl(ApiControllerPrefix.Room)}/home/${homeId}`);
    }

    createRoom(payload: CreateRoomPayload) {
        return this.http.post(getControllerUrl(ApiControllerPrefix.Room), payload)
    }

    updateRoom(payload: UpdateRoomPayload) {
        return this.http.put(getControllerUrl(ApiControllerPrefix.Room), payload)
    }

    deleteRoom(id: string) {
        return this.http.delete(`${getControllerUrl(ApiControllerPrefix.Room)}/${id}`)
    }


    createDevice(payload: CreateDevicePayload) {
        return this.http.post(getControllerUrl(ApiControllerPrefix.Device), payload)
    }

    updateDevice(payload: UpdateDevicePayload) {
        return this.http.put(`${getControllerUrl(ApiControllerPrefix.Device)}/${payload.id}`, payload)
    }

    deleteDevice(id: string) {
        return this.http.delete(`${getControllerUrl(ApiControllerPrefix.Device)}/${id}`)
    }


    getAlarm(homeId: string): Observable<AlarmDetailsVm | null> {
        return this.http.get<AlarmDetailsVm | null>(getControllerUrl(ApiControllerPrefix.Alarm));
    }

    createAlarm(payload: CreateAlarmPayload) {
        return this.http.post(getControllerUrl(ApiControllerPrefix.Alarm), payload)
    }

    deleteAlarm(id: string) {
        return this.http.delete(`${getControllerUrl(ApiControllerPrefix.Alarm)}/${id}`)
    }
}