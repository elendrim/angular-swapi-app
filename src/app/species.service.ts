import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators'
import { People } from './people.service';



export interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  url = "https://swapi.dev/api/species/";

  constructor(
    private http: HttpClient
  ) { }

  getSpecies(id: string) : Observable<Species> {
    return this.http.get<Species>(this.url + id +"?format=json");
  }

  getSpeciesFromURL(url: string) : Observable<Species> {
    return this.http.get<Species>(url +"?format=json");
  }

  findSpecies(
    search = '',
    ordering = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3) :  Observable<Species[]> {

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

  countSpecies(search = '') :  Observable<number> {

    return this.http.get(this.url, {
        params: new HttpParams()
            .set('search', search)
    }).pipe(
        map(res =>  res["count"])
    );
  
  }
}
