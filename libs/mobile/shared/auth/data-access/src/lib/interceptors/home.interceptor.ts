import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOME_ID_HEADER_KEY } from '@smart-home/shared/util-constants';

// todo: get homeId from auth service
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6';

export class HomeInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.headers.append(HOME_ID_HEADER_KEY, homeId);
    return next.handle(req);
  }
}
