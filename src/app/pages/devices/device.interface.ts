export interface Device {
    id?: string,
    brand: string,
    marketName: string,
    model: string,
    deviceType: string,
    stockType: string,
    gsm: boolean,
    umts: boolean,
    lte: boolean,
    nr: boolean,
    maxTec: string,
    cfPerformance: number,
    cfCamera: number,
    cfBattery: number,
    cfDesing: number,
    cfScreen: number,
    cfAudio: number,
    cfConnectivity: number,
    cfOs: number,
    price74: number,
    storePR: boolean,
    storeSM: boolean,
    storeCL: boolean,
    urlPicture: string
}

export class  FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;

    constructor(file: File){
        this.file = file;
    }
}
