import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class ControlDeviceService {

    read(address: string) {
        console.log('Read from: ' + address)
    }

    writeDigital(value: boolean, address: string) {
        Logger.log('--- WRITE VALUE ---')
        Logger.log(`Write value: ${value} to ${address}`)
    }

    writeAnalog(value: number, address: string) {
        Logger.log('--- WRITE VALUE ---')
        Logger.log(`Write value: ${value} to ${address}`)
    }
}