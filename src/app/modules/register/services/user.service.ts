import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, finalize, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { CheckEmail, CheckEmailResponse, CheckIdentification, CheckIdentificationResponse } from "../models/user.model";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private API_URL = `${environment.apiUrl}/usuarios`;
    emailSubject = new BehaviorSubject<CheckEmail | null>(null);
    email$ = this.emailSubject.asObservable();

    identificationSubject = new BehaviorSubject<CheckIdentification | null>(null);
    identification$ = this.identificationSubject.asObservable();

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
    ) {
    }

    checkEmail(email: string): Observable<CheckEmail> {
        this.spinner.show();
        return this.http.get<CheckEmailResponse>(`${this.API_URL}/existe-correo?correo=${email}`).pipe(
            map((data: CheckEmailResponse) => this.mapResponse(data)),
            tap((response: CheckEmail) => {
                this.emailSubject.next(response);
            }),
            finalize(() => this.spinner.hide())
        );
    }

    checkIdentification(identification: string): Observable<CheckIdentification> {
        this.spinner.show();
        return this.http.get<CheckIdentificationResponse>(`${this.API_URL}/existe?identificacion=${identification}`).pipe(
            map((data: CheckIdentificationResponse) => this.mapIdentificationResponse(data)),
            tap((response: CheckIdentification) => {
                this.identificationSubject.next(response);
            }),
            finalize(() => this.spinner.hide())
        );
    }

    mapResponse(data: CheckEmailResponse): CheckEmail {
        return {
            email: data.correo,
            exist: data.existe,
            message: data.mensaje
        }
    }

    mapIdentificationResponse(data: CheckIdentificationResponse): CheckIdentification {
        return {
            exist: data.existe,
            identification: data.identificacion,
            message: data.mensaje
        }
    }
}