import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { CivilRegistry, CivilRegistryResponse } from "../models/civil-registry.model";

@Injectable({
    providedIn: 'root'
})
export class WSService {
    civilRegistrySubject = new BehaviorSubject<CivilRegistry | null>(null);
    civilRegistry$ = this.civilRegistrySubject.asObservable();

    private API_URL = `${environment.apiUrl}/registro-civil`;

    constructor(private http: HttpClient) {
    }

    getDataFromCivilRegister(identification: string): Observable<CivilRegistry> {
        return this.http.get<CivilRegistryResponse>(`${this.API_URL}/${identification}`).pipe(
            map((data: CivilRegistryResponse) => this.mapCivilRegistry(data)),
            tap((questions: CivilRegistry) => {
                this.civilRegistrySubject.next(questions);
            })
        );
    }

    mapCivilRegistry(data: CivilRegistryResponse): CivilRegistry {
        return {
            name: data.nombres,
            birthDate: data.fechaNacimiento,
            lastName: data.apellidos,
            maritalStatus: data.estadoCivil,
        }
    }
}