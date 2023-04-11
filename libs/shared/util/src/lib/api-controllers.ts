export enum ApiControllerPrefix {
  Room = 'room',
}

const API_URL = 'http://localhost:3333/api/';

export function getControllerUrl(controller: ApiControllerPrefix): string {
  return API_URL + controller;
}
