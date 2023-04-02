export enum ApiControllerPrefix {
  Room = 'room',
}

export function getControllerUrl(controller: ApiControllerPrefix): string {
  return 'http://localhost:3333/api/' + controller;
}
