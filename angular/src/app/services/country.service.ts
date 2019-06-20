import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CountryModel } from '../model/country.model';

interface CountryNameInterface {
  country: String
}

@Injectable({
  providedIn: "root"
})
export class CountryService {
  constructor(private http: HttpClient) { }

  getCountryName(): Observable<CountryNameInterface[]> {
    return this.http.get<CountryNameInterface[]>("/assets/country/name.json");
  }

  addCountry(countryData: CountryModel): Observable<any> {
    return this.http.post<any>('http://localhost:4545/country/add', countryData);
  }

  getCountry(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>("http://localhost:4545/country/list");
  }
}
// .map((res: Response) => {
//         res.json();
//       })