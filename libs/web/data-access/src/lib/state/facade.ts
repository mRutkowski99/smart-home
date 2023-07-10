import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {WebState} from "./reducer";
import {webSelectors} from "./selectors";
import {webActions} from "./actions";
import {CreateHomePayload} from "@smart-home/shared/home/util-home-payload";
import {CreateRoomPayload, UpdateRoomPayload} from "@smart-home/shared/room/util-room-payload";
import {CreateDevicePayload, UpdateDevicePayload} from "@smart-home/shared/device/util-device-payload";
import {CreateAlarmPayload} from "@smart-home/shared/alarm/util-alarm-payload";
import {CreateUserPayload} from "@smart-home/shared/user/util-user-payload";

@Injectable()
export class WebFacade {
    constructor(private store: Store<WebState>) {
    }

    homesVm$ = this.store.select(webSelectors.homesVmSelector)
    roomsVm$ = this.store.select(webSelectors.roomsVmSelector)
    alarmVm$ = this.store.select(webSelectors.alarmVmSelector)
    usersVm$ = this.store.select(webSelectors.usersVmSelector)

    setSelectedHomeId(id: string | null) {
        this.store.dispatch(webActions.setSelectedHomeId({id}))
    }

    getHomes() {
        this.store.dispatch(webActions.getHomes())
    }

    createHome(payload: CreateHomePayload) {
        this.store.dispatch(webActions.createHome({payload}))
    }

    deleteHome(id: string) {
        this.store.dispatch(webActions.deleteHome({id}))
    }

    getRooms(homeId: string) {
        this.store.dispatch(webActions.getRooms({homeId}))
    }

    createRoom(payload: CreateRoomPayload) {
        this.store.dispatch(webActions.createRoom({payload}))
    }

    updateRoom(payload: UpdateRoomPayload) {
        this.store.dispatch(webActions.updateRoom({payload}))
    }

    deleteRoom(roomId: string) {
        this.store.dispatch(webActions.deleteRoom({roomId}))
    }

    createDevice(payload: CreateDevicePayload) {
        this.store.dispatch(webActions.createDevice({payload}))
    }

    updateDevice(payload: UpdateDevicePayload) {
        this.store.dispatch(webActions.updateDevice({payload}))
    }

    deleteDevice(deviceId: string) {
        this.store.dispatch(webActions.deleteDevice({deviceId}))
    }

    getAlarm(homeId: string) {
        this.store.dispatch(webActions.getAlarm({homeId}))
    }

    createAlarm(payload: CreateAlarmPayload) {
        this.store.dispatch(webActions.createAlarm({payload}))
    }

    deleteAlarm(alarmId: string) {
        this.store.dispatch(webActions.deleteAlarm({alarmId}))
    }

    getUsers(homeId: string) {
        this.store.dispatch(webActions.getUsers({homeId}))
    }

    createUser(payload: CreateUserPayload) {
        this.store.dispatch(webActions.createUser({payload}))
    }

    deleteUser(userId: string) {
        this.store.dispatch(webActions.deleteUser({userId}))
    }

    resetPassword(userId: string) {
        this.store.dispatch(webActions.resetPassword({userId}))
    }
}