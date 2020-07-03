import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'



export interface Planet {
  id: string;
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  url = "https://swapi.dev/api/planets/";

  constructor(
    private http: HttpClient
  ) { }

  getPlanet(id: string) : Observable<Planet> {
    return this.http.get<Planet>(this.url + id +"?format=json");
  }

  getPlanetFromURL(url: string) : Observable<Planet> {
    return this.http.get<Planet>(url +"?format=json");
  }
}
