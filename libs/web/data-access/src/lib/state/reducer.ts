import { HomeVm } from '@smart-home/shared/home/util-home-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { RoomDetailsVm } from '@smart-home/shared/room/util-room-vm';
import { AlarmDetailsVm } from '@smart-home/shared/alarm/util-alarm-vm';
import { createReducer, on } from '@ngrx/store';
import { webActions } from './actions';
import { UserVm } from '@smart-home/shared/user/util-user-vm';

export const WEB_FEATURE_KEY = 'web';

export interface WebState {
  homes: HomeVm[];
  homesStatus: StoreStatus;
  homesError: string | null;
  selectedHomeId: string | null;
  rooms: RoomDetailsVm[];
  roomsStatus: StoreStatus;
  roomsError: string | null;
  alarm: AlarmDetailsVm | null;
  alarmStatus: StoreStatus;
  alarmError: string | null;
  users: UserVm[];
  usersStatus: StoreStatus;
  usersError: string | null;
}

const initialState: WebState = {
  homes: [],
  homesStatus: 'loading',
  homesError: null,
  selectedHomeId: null,
  rooms: [],
  roomsStatus: 'loading',
  roomsError: null,
  alarm: null,
  alarmStatus: 'loading',
  alarmError: null,
  users: [],
  usersStatus: 'loading',
  usersError: null,
};

export const reducer = createReducer(
  initialState,
  on(webActions.setSelectedHomeId, (state, { id }) => ({
    ...state,
    selectedHomeId: id,
  })),
  on(webActions.getHomes, (state) => ({
    ...state,
    homesStatus: 'loading',
    homesError: null,
  })),
  on(webActions.getHomesSuccess, (state, { homes }) => ({
    ...state,
    homes,
    homesStatus: 'success',
  })),
  on(webActions.getHomesFail, (state, { error }) => ({
    ...state,
    homesStatus: 'error',
    homesError: error,
  })),
  on(webActions.getRooms, (state) => ({
    ...state,
    roomsStatus: 'loading',
    roomsError: null,
  })),
  on(webActions.getRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms,
    roomsStatus: 'success',
  })),
  on(webActions.getRoomsFail, (state, { error }) => ({
    ...state,
    roomsStatus: 'error',
    roomsError: error,
  })),
  on(webActions.getAlarm, (state) => ({
    ...state,
    alarmStatus: 'loading',
    alarmError: null,
  })),
  on(webActions.getAlarmSuccess, (state, { alarm }) => ({
    ...state,
    alarm,
    alarmStatus: 'success',
  })),
  on(webActions.getAlarmFail, (state, { error }) => ({
    ...state,
    alarmError: error,
    alarmStatus: 'error',
  })),

  on(webActions.getUsers, (state) => ({
    ...state,
    usersStatus: 'loading',
    usersError: null,
  })),

  on(webActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    usersStatus: 'success',
  })),
  on(webActions.getUsersFail, (state, { error }) => ({
    ...state,
    usersError: error,
    usersStatus: 'error',
  }))
);
