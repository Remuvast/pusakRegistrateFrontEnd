export interface Catalogs {
    id: number;
    name: string;
    description: string;
    code: string;
    catalogTypeId: number;
    state: boolean;
}

export interface CatalogsResponse {
    id: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    tiposCatalogosId: number;
    estado: boolean;
}

export enum CatalogTypes {
    IDENTIFICATION_TYPE = 'tipos-identificacion',
    GENDERS = 'generos',
    MARITAL_STATUS = 'estado-civil',
    ETHNICITY = 'etnia',
    DISABILITY = 'discapacidades',
    NACIONALITY = 'nacionalidad',
}