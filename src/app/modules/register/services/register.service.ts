import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IRegister, IRegisterRequest, IRegisterResponse, IRegisterSuccess } from "../models/register.model";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private API_URL = `${environment.apiUrl}/registro`;
    statusSubject = new BehaviorSubject<boolean | null>(null);
    status$ = this.statusSubject.asObservable();

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) {
    }

    saveRegister(form: IRegister): Observable<IRegisterSuccess | boolean> {
        this.spinner.show();
        return this.http.post<IRegisterResponse>(this.API_URL, this.mapRequest(form)).pipe(
            map((data: IRegisterResponse) => this.mapResponse(data)),
            tap((response: IRegisterSuccess) => {
                if(response.message === 'Registro exitoso') {
                    this.statusSubject.next(true);
                } else {
                    this.statusSubject.next(false);
                }
                return response;
            }),
            catchError(err => {
                this.statusSubject.next(false);
                if(typeof err.error === 'string') {
                    this.toastr.warning(err.error, 'Error');
                }
                return of(false);
            }),
            finalize(() => this.spinner.hide())
        );
    }

    mapResponse(data: IRegisterResponse): IRegisterSuccess {
        return {
            message: data.mensaje
        }
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
