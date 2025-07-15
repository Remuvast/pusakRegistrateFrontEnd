import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { CivilRegistry, CivilRegistryError, CivilRegistryResponse } from "../models/civil-registry.model";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class WSService {
    civilRegistrySubject = new BehaviorSubject<CivilRegistry | null>(null);
    civilRegistry$ = this.civilRegistrySubject.asObservable();

    civilRegistryErrorSubject = new BehaviorSubject<CivilRegistryError | null>(null);
    civilRegistryError$ = this.civilRegistryErrorSubject.asObservable();

    private API_URL = `${environment.apiUrl}/registro-civil`;

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
    ) {
    }

    getDataFromCivilRegister(identification: string): Observable<CivilRegistry | null> {
        this.spinner.show()
        return this.http.post<CivilRegistryResponse>(`${this.API_URL}/consultar`, { numeroCedula: identification }).pipe(
            map((data: CivilRegistryResponse) => this.mapCivilRegistry(data)),
            tap((civilRegistryData: CivilRegistry) => {
                this.civilRegistrySubject.next(civilRegistryData);
            }),
            catchError((err: any) => {
                if(err.error)
                    this.civilRegistryErrorSubject.next(err.error);
                return of(null)
            }),
            finalize(() => this.spinner.hide())
        );
    }

    mapCivilRegistry(data: CivilRegistryResponse): CivilRegistry {
        const genero = data.sexo === 'HOMBRE' ? 'MASCULINO' : 'FEMENINO';
        return {
            name: data.nombre,
            birthDate: data.fechaNacimiento,
            lastName: data.apellidosCompletos,
            maritalStatus: data.estadoCivil,
            blockNames: data.nombreBloqueado,
            fathersLastName: data.apellidoPaterno,
            fullName: data.nombresApellidos,
            globalData: data.datosGlobales,
            identification: data.cedula,
            mothersLastName: data.apellidoMaterno,
            sex: genero,
            cityBirth: data.cantonNacimiento,
            parishBirth: data.parroquiaNacimiento,
            provinceBirth: data.provinciaNacimiento,
        }
    }
}