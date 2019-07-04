import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { CountryModel } from '../model/country.model';

interface CountryNameInterface {
  country: String
}


@Injectable({
  providedIn: "root"
})
export class CountryService {

  url: string = "http://localhost:4545/country/";

  constructor(private http: HttpClient) { }


  // country name from json resourse file
  getCountryName(): Observable<CountryNameInterface[]> {
    return this.http.get<CountryNameInterface[]>("/assets/country/name.json");
  }


  // add country
  addCountry(countryData: CountryModel): Observable<any> {
    return this.http.post<any>(this.url + "add", countryData);
  }


  // file upload service
  upload(formData): Observable<any> {
    return this.http.post<any>(this.url + "upload", formData)
      .pipe(
        catchError(this.handleError)
      );
  };


  // handling errors in file uploading
  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error("An error occurred", err.error.message);
    } else {
      console.error("Backend returned code" + err.status + ", Body was : " + err.error)
    }
    return throwError("Something bad happened.. please try again later");
  }


  // getting country details
  getCountry(): Observable<any> {
    return this.http.get<any>(this.url + "list");
  }


  // getting country details by ID
  getCountryById(id): Observable<any> {
    return this.http.get<any>(this.url + "get/" + id);
  }


  deleteCountry(id) {
    return this.http.post(this.url + "delete/", { id });
  }


  editCountry(id, newCountryData) {
    return this.http.post(this.url + "edit", { id, newCountryData });
  }


}
// .map((res: Response) => {
//         res.json();
//       })