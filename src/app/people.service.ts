import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators'



export interface People {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  url = "https://swapi.dev/api/people/";

  constructor(
    private http: HttpClient
  ) { }

  getPeople(id: string) : Observable<People> {
    return this.http.get<People>(this.url + id + '?format=json');
  }

  getPeopleFromURL(url: string) : Observable<People> {
    return this.http.get<People>(url +"?format=json");
  }

  findPeople(
    search = '',
    ordering = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3) :  Observable<People[]> {

    let page = pageNumber +1;

    return this.http.get(this.url, {
        params: new HttpParams()
            .set('search', search)
            .set('ordering', ordering)
            // .set('sortOrder', sortOrder)
            .set('page', page.toString())
            // .set('pageSize', pageSize.toString())
    }).pipe(
        map(res =>  res["results"])
    );
  
  }

  countPeople(search = '') :  Observable<number> {

    return this.http.get(this.url, {
        params: new HttpParams()
            .set('search', search)
    }).pipe(
        map(res =>  res["count"])
    );
  
  }

}
