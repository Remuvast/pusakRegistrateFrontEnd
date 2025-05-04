import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, tap, throwError } from "rxjs";
import { Catalogs, CatalogsResponse, CatalogTypes } from "../models/catalog.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    genderSubject = new BehaviorSubject<Catalogs[]>([]);
    gender$ = this.genderSubject.asObservable();
    gendersUpdated = new EventEmitter<void>();

    maritalStatusSubject = new BehaviorSubject<Catalogs[]>([]);
    maritalStatus$ = this.maritalStatusSubject.asObservable();
    maritalStatusesUpdated = new EventEmitter<void>();

    disabilitySubject = new BehaviorSubject<Catalogs[]>([]);
    disability$ = this.disabilitySubject.asObservable();
    disabilitiesUpdated = new EventEmitter<void>();

    ethnicitySubject = new BehaviorSubject<Catalogs[]>([]);
    ethnicity$ = this.ethnicitySubject.asObservable();
    ethnicitiesUpdated = new EventEmitter<void>();

    identificationTypeSubject = new BehaviorSubject<Catalogs[]>([]);
    identificationType$ = this.identificationTypeSubject.asObservable();
    identificationTypesUpdated = new EventEmitter<void>();

    nacionalitySubject = new BehaviorSubject<Catalogs[]>([]);
    nacionality$ = this.nacionalitySubject.asObservable();
    nacionalitiesUpdated = new EventEmitter<void>();

    private API_URL = `${environment.apiUrl}/catalogos`;

    constructor(private http: HttpClient) {
        
    }

    getOptionsCatalog(type: string): Observable<Catalogs[]> {
        this.isLoadingSubject.next(true);
        return this.http.get<CatalogsResponse[]>(`${this.API_URL}/${type}`).pipe(
            map((data: CatalogsResponse[]) => {
                const response: Catalogs[] = this.mapCatalogs(data)
                this.setCatalog(response, type);
                return response;
            }),
            catchError((err:any) => {
                return throwError(() => [])
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
            })
        );
    }

    setCatalog(catalogs: Catalogs[], type: string): void {
        switch(type) {
            case CatalogTypes.GENDERS:
                this.genderSubject.next(catalogs);
                this.gendersUpdated.emit();
                break;
            case CatalogTypes.DISABILITY: 
                this.disabilitySubject.next(catalogs);
                this.disabilitiesUpdated.emit();
                break;
            case CatalogTypes.ETHNICITY:
                this.ethnicitySubject.next(catalogs);
                this.ethnicitiesUpdated.emit(); 
                break;
            case CatalogTypes.IDENTIFICATION_TYPE:
                this.identificationTypeSubject.next(catalogs);
                this.identificationTypesUpdated.emit();
                break;
            case CatalogTypes.MARITAL_STATUS:
                this.maritalStatusSubject.next(catalogs);
                this.maritalStatusesUpdated.emit();
                break;
            case CatalogTypes.NACIONALITY:
                this.nacionalitySubject.next(catalogs);
                this.nacionalitiesUpdated.emit();
                break;
            default:
                break;
        }
    }

    mapCatalogs(data: CatalogsResponse[]): Catalogs[] {
        return data.filter(x => x.estado).map((x: CatalogsResponse) => {
            return {
                id: x.id,
                name: x.nombre,
                description: x.descripcion,
                catalogTypeId: x.tiposCatalogosId,
                code: x.codigo,
                state: x.estado,
            }
        }).sort((a, b) => a.name.localeCompare(b.name));
    }
}