import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'



export interface Films {
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
export class FilmsService {

  url = "https://swapi.dev/api/films/";

  constructor(
    private http: HttpClient
  ) { }

  getFilms(id: string) : Observable<Films> {
    return this.http.get<Films>(this.url + id +"?format=json");
  }

  getFilmsFromURL(url: string) : Observable<Films> {
    return this.http.get<Films>(url +"?format=json");
  }
}
