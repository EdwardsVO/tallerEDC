
export interface Appointment {
    appointmentId?: string,
    carBrand?: string,
    carModel?: string,
    carPlate?: string,
    carYear?: string,
    carColor?: string,
    carKm?: string,
    carGas?: string,
    extraTire?: boolean,
    keys?: boolean,
    tools?: boolean,
    stereo?: boolean,
    scratches?: boolean,
    mechName?: string,
    repairs?: number,
    totalPriceService?: number,
    diagnostic?: string;
    procedure?: string;
    repuestos?: string;
}
