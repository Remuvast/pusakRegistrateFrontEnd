import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAccount, IAccountResponse } from "../models/account.model";

@Injectable({
    providedIn: 'root'
})
export class ActivateAccountService {
    
    private API_URL = `${environment.apiUrl}/activar`;
    statusSubject = new BehaviorSubject<boolean | null>(null);
    status$ = this.statusSubject.asObservable();

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) {
    }

    activateAccount(code: string, id: string): Observable<boolean | IAccount> {
        this.spinner.show();
        return this.http.get<IAccountResponse>(`${this.API_URL}?id=${id}&codigo=${code}`).pipe(
            map((response: IAccountResponse) => this.mapResponse(response)),
            tap((response: IAccount) => {
                this.statusSubject.next(response.success);
                return of(response.success)
            }),
            catchError((err) => {
                if(typeof err.error === 'string') {
                    this.toastr.warning(err.error, 'Error');
                }
                this.statusSubject.next(false);
                return of(false)
            }),
            finalize(() => this.spinner.hide())
        );
    }

    mapResponse(response: IAccountResponse): IAccount {
        return {
            message: response.mensaje,
            success: response.success,
        }
    }
}