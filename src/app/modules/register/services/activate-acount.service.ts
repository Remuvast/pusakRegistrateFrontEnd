import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";

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

    activateAccount(code: string, id: string): Observable<boolean | string> {
        this.spinner.show();
        return this.http.get<string>(`${this.API_URL}?id=${id}&codigo=${code}`).pipe(
            map((data: string) => data),
            tap((response: string) => {
                if(response === 'Cuenta activada exitosamente.') {
                    this.statusSubject.next(true);
                    return of(true)
                }
                this.statusSubject.next(false);
                return of(false)
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
}