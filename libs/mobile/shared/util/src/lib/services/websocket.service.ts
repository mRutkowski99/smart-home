import {webSocket} from "rxjs/webSocket";

export class WebsocketService {
    private socketSubject = webSocket('ws://localhost:3333')
    events$ = this.socketSubject.asObservable()

}