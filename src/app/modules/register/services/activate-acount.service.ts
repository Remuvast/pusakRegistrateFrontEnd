import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ActivateAccountService {
    
    private API_URL = `${environment.apiUrl}/activar`;

    constructor(private http: HttpClient) {
    }

    activateAccount(code: string, id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.API_URL}?id=${id}&codigo=${code}`).pipe(
            map((data: boolean) => data),
            tap((response: boolean) => {
                
            })
        );
    }
}