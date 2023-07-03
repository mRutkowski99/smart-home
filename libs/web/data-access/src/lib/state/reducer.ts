import { HomeVm } from '@smart-home/shared/home/util-home-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { RoomDetailsVm } from '@smart-home/shared/room/util-room-vm';
import { AlarmDetailsVm } from '@smart-home/shared/alarm/util-alarm-vm';
import { createReducer, on } from '@ngrx/store';
import { webActions } from './actions';

export const WEB_FEATURE_KEY = 'web'

export interface WebState {
  homes: HomeVm[];
  homesStatus: StoreStatus;
  homesError: string | null;
  rooms: RoomDetailsVm[];
  roomsStatus: StoreStatus;
  roomsError: string | null;
  alarm: AlarmDetailsVm | null;
  alarmStatus: StoreStatus;
  alarmError: string | null;
}

const initialState: WebState = {
  homes: [],
  homesStatus: 'loading',
  homesError: null,
  rooms: [],
  roomsStatus: 'loading',
  roomsError: null,
  alarm: null,
  alarmStatus: 'loading',
  alarmError: null,
};

export const reducer = createReducer(
  initialState,
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
  }))
);
