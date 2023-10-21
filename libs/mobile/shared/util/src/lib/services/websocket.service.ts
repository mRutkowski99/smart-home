import {webSocket} from "rxjs/webSocket";

export abstract class WebsocketService {
    constructor(protected url: string) {
    }
    protected readonly socketSubject = webSocket(this.url)
    events$ = this.socketSubject.asObservable()

    sendMessage(event: any) {
        this.socketSubject.next(event)
    }

    close() {
        this.socketSubject.complete()
    }
}