import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'



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
}
