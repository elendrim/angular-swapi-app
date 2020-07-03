import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'



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
}
