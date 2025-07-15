export interface CivilRegistry {
    name: string;
    lastName: string;
    birthDate: string;
    maritalStatus: string;
    identification: string;
    fathersLastName: string;
    mothersLastName: string;
    sex: string;
    fullName: string;
    globalData: string;
    blockNames: boolean;
    provinceBirth: string;
    cityBirth: string;
    parishBirth: string;
}

export interface CivilRegistryError {
    error: string;
    message: string;
    status: number;
}

export interface CivilRegistryResponse {
    nombre: string;
    apellidosCompletos: string;
    fechaNacimiento: string;
    estadoCivil: string;
    cedula: string
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: string;
    nombresApellidos: string;
    datosGlobales: string;
    nombreBloqueado: boolean
    provinciaNacimiento: string;
    cantonNacimiento: string;
    parroquiaNacimiento: string;
}
