export interface Vehicle {
    owner?: string;
    serial?: string;
    marca?: string;
    modelo?: string;
    year?: string;
    placa?: string;
    id2?: string;

}

export class Vehicle {
    constructor (serial) {
        this.serial = serial
    }
    toString() {
        return this.serial;
    }
}