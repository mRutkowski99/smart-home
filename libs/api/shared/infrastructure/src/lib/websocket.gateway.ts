import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class WebsocketGateway {
    @WebSocketServer() private server!: Server

    sendEventToClients(event: any) {
        this.server.emit(event.pattern, event)
    }
}