import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators'



export interface Starship {
  id : string;
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity : string;
  consumables : string;
  films: string[];
  pilots: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  url = "https://swapi.dev/api/starships/";

  constructor(
    private http: HttpClient
  ) { }

  getStarship(id: string) : Observable<Starship>  {
    return this.http.get<Starship>(this.url + id +"?format=json");
  }

  getStarshipFromURL(url: string) : Observable<Starship> {
    return this.http.get<Starship>(url +"?format=json");
  }



  findStarship(
    search = '',
    ordering = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3) :  Observable<Starship[]> {

    var page = pageNumber +1;

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

  countStarship(search = '') :  Observable<number> {

    return this.http.get(this.url, {
        params: new HttpParams()
            .set('search', search)
    }).pipe(
        map(res =>  res["count"])
    );
  
  }
}
