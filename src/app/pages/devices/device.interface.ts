export interface Device {
    id?: string,
    brand: string,
    marketName: string,
    model: string,
    deviceType: string,
    gsm: boolean,
    umts: boolean,
    lte: boolean,
    nr: boolean,
    maxTec?:string
}