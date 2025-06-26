export interface Disability {
    wsAvailable: boolean;
    value: string;
    type: string;
    percent: number;
}

export interface DisabilityError {
    error: string;
    message: string;
    status: number;
}

export interface DisabilityResponse {
    wsDisponible: boolean;
    valor: string;
    tipo: string;
    porcentaje: number;
}
