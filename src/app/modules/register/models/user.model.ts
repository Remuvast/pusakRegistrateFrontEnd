export interface CheckEmailResponse {
    mensaje: string;
    existe: boolean;
    correo: string;
}

export interface CheckIdentificationResponse {
    mensaje: string;
    existe: boolean;
    identificacion: string;
}

export interface CheckEmail {
    message: string;
    exist: boolean;
    email: string;
}

export interface CheckIdentification {
    message: string;
    exist: boolean;
    identification: string;
}
