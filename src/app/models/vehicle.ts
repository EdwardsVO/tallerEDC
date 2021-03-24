export interface Vehicle {
    owner?: string;
    serial?: string;
    brand?: string;
    model?: string;
    year?: string;
    plate?: string;
    id2?: string;
    photo?: string;

}

export class Vehicle {
    constructor (serial) {
        this.serial = serial
    }
    toString() {
        return this.serial;
    }
}