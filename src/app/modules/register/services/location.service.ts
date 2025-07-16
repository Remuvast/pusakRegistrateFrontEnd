import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, finalize, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Location, LocationResponse } from "../models/location.model";
import { NgxSpinnerService } from "ngx-spinner";

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
    countriesBirth$ = this.countriesBirthSubject.asObservable();
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

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
    ) {
    }

    getCountries(isBirth = false): Observable<Location[]> {
        this.spinner.show();
        return this.http.get<LocationResponse[]>(`${this.API_URL}/paises`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                if(isBirth) {
                    this.countriesBirthSubject.next(catalogs);
                    this.provincesBirthSubject.next([]);
                    this.citiesBirthSubject.next([]);
                    this.parishesBirthSubject.next([]);
                    this.countriesBirthUpdated.emit();
                    this.provincesBirthUpdated.emit();
                    this.citiesBirthUpdated.emit();
                    this.parishesBirthUpdated.emit();    
                } else {
                    this.countriesSubject.next(catalogs);
                    this.provincesSubject.next([]);
                    this.citiesSubject.next([]);
                    this.parishesSubject.next([]);
                    this.countriesUpdated.emit();
                    this.provincesUpdated.emit();
                    this.citiesUpdated.emit();
                    this.parishesUpdated.emit();
                }
            }),
            finalize(() => this.spinner.hide())
        );
    }

    getProvinces(countryId: number, isBirth = false): Observable<Location[]> {
        this.spinner.show();
        return this.http.get<LocationResponse[]>(`${this.API_URL}/provincias/${countryId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                if(isBirth) {
                    this.provincesBirthSubject.next(catalogs);
                    this.citiesBirthSubject.next([]);
                    this.parishesBirthSubject.next([]);
                    this.provincesBirthUpdated.emit();
                    this.citiesBirthUpdated.emit();
                    this.parishesBirthUpdated.emit();
                } else {
                    this.provincesSubject.next(catalogs);
                    this.citiesSubject.next([]);
                    this.parishesSubject.next([]);
                    this.provincesUpdated.emit();
                    this.citiesUpdated.emit();
                    this.parishesUpdated.emit();
                }
            }),
            finalize(() => this.spinner.hide())
        );
    }

    getCities(provinceId: number, isBirth = false): Observable<Location[]> {
        this.spinner.show();
        return this.http.get<LocationResponse[]>(`${this.API_URL}/cantones/${provinceId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                if(isBirth) {
                    this.citiesBirthSubject.next(catalogs);
                    this.parishesBirthSubject.next([]);
                    this.citiesBirthUpdated.emit();
                    this.parishesBirthUpdated.emit();
                } else {
                    this.citiesSubject.next(catalogs);
                    this.parishesSubject.next([]);
                    this.citiesUpdated.emit();
                    this.parishesUpdated.emit();
                }
            }),
            finalize(() => this.spinner.hide())
        );
    }

    getParishes(cityId: number, isBirth = false): Observable<Location[]> {
        this.spinner.show();
        return this.http.get<LocationResponse[]>(`${this.API_URL}/parroquias/${cityId}`).pipe(
            map((data: LocationResponse[]) => this.mapLocations(data)),
            tap((catalogs: Location[]) => {
                if(isBirth) {
                    this.parishesBirthSubject.next(catalogs);
                    this.parishesBirthUpdated.emit();
                } else {
                    this.parishesSubject.next(catalogs);
                    this.parishesUpdated.emit();
                }
            }),
            finalize(() => this.spinner.hide())
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