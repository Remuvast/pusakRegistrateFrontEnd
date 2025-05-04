export interface CivilRegistry {
    name: string;
    lastName: string;
    birthDate: Date;
    maritalStatus: string;
}

export interface CivilRegistryResponse {
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    estadoCivil: string;
}
