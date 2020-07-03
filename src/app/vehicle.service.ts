import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'



export interface Vehicle {
  id : string;
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url = "https://swapi.dev/api/vehicles/";

  constructor(
    private http: HttpClient
  ) { }

  getVehicle(id: string) : Observable<Vehicle>  {
    return this.http.get<Vehicle>(this.url + id +"?format=json");
  }

  getVehicleFromURL(url: string) : Observable<Vehicle> {
    return this.http.get<Vehicle>(url +"?format=json");
  }
}
