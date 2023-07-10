export enum ApiControllerPrefix {
  Home = 'home',
  Room = 'room',
  Device = 'device',
  Scene = 'scene',
  Alarm = 'alarm',
  Usage = 'usage',
  User = 'user',
  Auth = 'auth',
}

const API_URL = 'http://localhost:3333/api/';

export function getControllerUrl(controller: ApiControllerPrefix): string {
  return API_URL + controller;
}
