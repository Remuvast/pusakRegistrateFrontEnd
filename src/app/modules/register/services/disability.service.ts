import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Disability, DisabilityError, DisabilityResponse } from "../models/disability.model";

@Injectable({
    providedIn: 'root'
})
export class DisabilityService {
    disabilitySubject = new BehaviorSubject<Disability | null>(null);
    disability$ = this.disabilitySubject.asObservable();

    disabilityErrorSubject = new BehaviorSubject<DisabilityError | null>(null);
    disabilityError$ = this.disabilityErrorSubject.asObservable();

    private API_URL = `${environment.apiUrl}/discapacidad`;

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
    ) {
    }

    getDataFromDisability(identification: string): Observable<Disability | null> {
        this.spinner.show()
        return this.http.post<DisabilityResponse>(`${this.API_URL}/consultar`, { numeroCedula: identification }).pipe(
            map((data: DisabilityResponse) => this.mapDisability(data)),
            tap((civilRegistryData: Disability) => {
                this.disabilitySubject.next(civilRegistryData);
            }),
            catchError((err: any) => {
                if(err.error)
                    this.disabilityErrorSubject.next(err.error);
                return of(null)
            }),
            finalize(() => this.spinner.hide())
        );
    }

    mapDisability(data: DisabilityResponse): Disability {
        return {
            percent: data.porcentaje,
            type: data.tipo,
            value: data.valor,
            wsAvailable: data.wsDisponible,
        }
    }
}