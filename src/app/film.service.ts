import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators'



export interface Film {
  id: string;
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  url = "https://swapi.dev/api/films/";

  constructor(
    private http: HttpClient
  ) { }

  getFilm(id: string) : Observable<Film> {
    return this.http.get<Film>(this.url + id +"?format=json");
  }

  getFilmFromURL(url: string) : Observable<Film> {
    return this.http.get<Film>(url +"?format=json");
  }



  findFilm(
    search = '',
    ordering = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3) :  Observable<Film[]> {

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

  countFilm(search = '') :  Observable<number> {

    return this.http.get(this.url, {
        params: new HttpParams()
            .set('search', search)
    }).pipe(
        map(res =>  res["count"])
    );
  
  }
}
