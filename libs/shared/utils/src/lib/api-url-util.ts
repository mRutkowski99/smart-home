import { environment } from 'apps/mobile/src/environments/environment';

export class ApiUrlUtil {
  private static readonly url = environment.apiUrl;

  static roomController = this.url + 'room/';
  static sceneController = this.url + 'scene/';
}
