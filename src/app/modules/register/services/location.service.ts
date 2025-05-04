import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Location, LocationResponse } from "../models/location.model";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private countriesSubject = new BehaviorSubject<Location[] | null>(null);
    countries$ = this.countriesSubject.asObservable();
    countriesUpdated = new EventEmitter<void>();

    private provincesSubject = new BehaviorSubject<Location[] | null>(null);
    provinces$ = this.provincesSubject.asObservable();
    provincesUpdated = new EventEmitter<void>();

    private citiesSubject = new BehaviorSubject<Location[] | null>(null);
    cities$ = this.citiesSubject.asObservable();
    citiesUpdated = new EventEmitter<void>();

    private parishesSubject = new BehaviorSubject<Location[] | null>(null);
    parishes$ = this.parishesSubject.asObservable();
    parishesUpdated = new EventEmitter<void>();

    private API_URL = `${environment.apiUrl}/ubicaciones`;

    constructor(private http: HttpClient) {
    }

    getCountries(): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/paises`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                this.countriesSubject.next(catalogs);
                this.provincesSubject.next([]);
                this.citiesSubject.next([]);
                this.parishesSubject.next([]);
                this.countriesUpdated.emit();
                this.provincesUpdated.emit();
                this.citiesUpdated.emit();
                this.parishesUpdated.emit();
            })
        );
    }

    getProvinces(countryId: number): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/provincias/${countryId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                this.provincesSubject.next(catalogs);
                this.citiesSubject.next([]);
                this.parishesSubject.next([]);
                this.citiesUpdated.emit();
                this.parishesUpdated.emit();
                this.provincesUpdated.emit();
            })
        );
    }

    getCities(provinceId: number): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/cantones/${provinceId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                this.citiesSubject.next(catalogs);
                this.parishesSubject.next([]);
                this.parishesUpdated.emit();
                this.citiesUpdated.emit();
            })
        );
    }

    getParishes(cityId: number): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/parroquias/${cityId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                this.parishesSubject.next(catalogs);
                this.parishesUpdated.emit();
            })
        );
    }

    mapLocations(data: LocationResponse[]): Location[] {
        return data.map((x: LocationResponse) => {
            return {
                id: x.id,
                name: x.nombre,
                code: x.codigo,
                parentId: x.padreId,
                type: x.tipo
            }
        }).sort((a, b) => a.name.localeCompare(b.name));
    }
}