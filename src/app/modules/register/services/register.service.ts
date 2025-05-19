import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IRegister, IRegisterRequest } from "../models/register.model";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private API_URL = `${environment.apiUrl}/registro`;

    constructor(private http: HttpClient) {
    }

    saveRegister(form: IRegister): Observable<boolean> {
        return this.http.post<boolean>(this.API_URL, this.mapRequest(form)).pipe(
            map((data: boolean) => data),
            tap((response: boolean) => {
                
            })
        );
    }

    mapRequest(data: IRegister): IRegisterRequest {
        return {
            apellidos: data.lastName,
            apellidosNombres: data.fullName,
            callePrincipal: data.street,
            calleSecundaria: data.secondaryStreet,
            celular: data.cellPhone,
            clave: data.password,
            codigoCantonNacimiento: data.cityBirth,
            codigoCantonResidencia: data.cityResidence,
            codigoEstadoCivil: data.maritalStatus,
            codigoEtnia: data.ethnicity,
            codigoGenero: data.gender,
            codigoNacionalidad: data.nacionality,
            codigoParroquiaNacimiento: data.parishBirth,
            codigoParroquiaResidencia: data.parishResidence,
            codigoProvinciaNacimiento: data.provinceBirth,
            codigoProvinciaResidencia: data.provinceResidence,
            codigoZonaResidencia: data.zone,
            codPaisNacimiento: data.countryBirth,
            codPaisResidencia: data.countryResidence,
            correoAlterno: data.secondEmailAddress,
            correoPrincipal: data.emailAddress,
            porcentajeDiscapacidad: data.disabilityPercent,
            catalogosTipoDiscapacidadId: data.disabilityType,
            fechaNacimiento: data.birthdate,
            lugarNacimiento: data.placeBirth,
            nombres: data.name,
            numero: data.number,
            numeroIdentificacion: data.identification,
            postalCode: data.postalCode,
            preguntas1Id: data.securityQuestionOne,
            preguntas2Id: data.securityQuestionTwo,
            preguntas3Id: data.securityQuestionThree,
            referencia: data.geographicReference,
            respuesta1: data.securityAnswerOne,
            respuesta2: data.securityAnswerTwo,
            respuesta3: data.securityAnswerThree,
            telefonoCelular2: data.secondCellPhone,
            sectorResidencia: data.sector,
            telefonoConvencional: data.phoneNumber,
            tipoIdentificacion: data.identificationType,
        }
    }
}