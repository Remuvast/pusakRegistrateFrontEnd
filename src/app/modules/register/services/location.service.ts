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

    private countriesBirthSubject = new BehaviorSubject<Location[]>([]);
    countriesBirth$ = this.countriesSubject.asObservable();
    countriesBirthUpdated = new EventEmitter<void>();

    private provincesBirthSubject = new BehaviorSubject<Location[]>([]);
    provincesBirth$ = this.provincesBirthSubject.asObservable();
    provincesBirthUpdated = new EventEmitter<void>();

    private citiesBirthSubject = new BehaviorSubject<Location[]>([]);
    citiesBirth$ = this.citiesBirthSubject.asObservable();
    citiesBirthUpdated = new EventEmitter<void>();

    private parishesBirthSubject = new BehaviorSubject<Location[]>([]);
    parishesBirth$ = this.parishesBirthSubject.asObservable();
    parishesBirthUpdated = new EventEmitter<void>();

    private API_URL = `${environment.apiUrl}/ubicaciones`;

    constructor(private http: HttpClient) {
    }

    getCountries(isBirth = false): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/paises`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                (isBirth ? this.countriesBirthSubject : this.countriesSubject).next(catalogs);
                (isBirth ? this.provincesBirthSubject : this.provincesSubject).next([]);
                (isBirth ? this.citiesBirthSubject : this.citiesSubject).next([]);
                (isBirth ? this.parishesBirthSubject : this.parishesSubject).next([]);
                (isBirth ? this.countriesBirthUpdated : this.countriesUpdated).emit();
                (isBirth ? this.provincesBirthUpdated : this.provincesUpdated).emit();
                (isBirth ? this.citiesBirthUpdated : this.citiesUpdated).emit();
                (isBirth ? this.parishesBirthUpdated : this.parishesUpdated).emit();
            })
        );
    }

    getProvinces(countryId: number, isBirth = false): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/provincias/${countryId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                (isBirth ? this.provincesBirthSubject : this.provincesSubject).next(catalogs);
                (isBirth ? this.citiesBirthSubject : this.citiesSubject).next([]);
                (isBirth ? this.parishesBirthSubject : this.parishesSubject).next([]);
                (isBirth ? this.provincesBirthUpdated : this.provincesUpdated).emit();
                (isBirth ? this.citiesBirthUpdated : this.citiesUpdated).emit();
                (isBirth ? this.parishesBirthUpdated : this.parishesUpdated).emit();
            })
        );
    }

    getCities(provinceId: number, isBirth = false): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/cantones/${provinceId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                (isBirth ? this.citiesBirthSubject : this.citiesSubject).next(catalogs);
                (isBirth ? this.parishesBirthSubject : this.parishesSubject).next([]);
                (isBirth ? this.citiesBirthUpdated : this.citiesUpdated).emit();
                (isBirth ? this.parishesBirthUpdated : this.parishesUpdated).emit();
            })
        );
    }

    getParishes(cityId: number, isBirth = false): Observable<Location[]> {
        return this.http.get<LocationResponse[]>(`${this.API_URL}/parroquias/${cityId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                (isBirth ? this.parishesBirthSubject : this.parishesSubject).next(catalogs);
                (isBirth ? this.parishesBirthUpdated : this.parishesUpdated).emit();
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