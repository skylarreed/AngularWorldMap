import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class CountryApiService {

  private baseUrl = 'https://api.worldbank.org/v2/country';
  

  // Cache the responses for each country code
  private cache: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  queryCountryData(countryCode: string): Observable<any> {
    // Check if the response is already cached
    if (this.cache.has(countryCode)) {
      return this.cache.get(countryCode)!;
    }

    const url = `${this.baseUrl}/${countryCode}?format=json`;

    // Create a new request and cache the response
    const request = this.http.get<any>(url).pipe(
      shareReplay(1)
    );

    this.cache.set(countryCode, request); // Store the request in cache before returning it
    return request;
  }

  getCountryData(countryCode: string, countryName: string) {
    let map = new Map();
    this.queryCountryData(countryCode).subscribe((data: any) => {
      map.set('countryName', countryName);
      map.set('countryCapital', data[1][0].capitalCity);
      map.set('countryRegion', data[1][0].region.value);
      map.set('countryIncomeLevel', data[1][0].incomeLevel.value);
      map.set('countryLatitude', data[1][0].latitude);
      map.set('countryLongitude', data[1][0].longitude);
    });
    return map;
  }
}
