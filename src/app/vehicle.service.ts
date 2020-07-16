import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators'
import { Starship } from './starship.service';



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

const url : string = "https://swapi.dev/api/vehicles/";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  

  constructor(
    private http: HttpClient
  ) { }

  getVehicle(id: string) : Observable<Vehicle>  {
    return this.http.get<Vehicle>(url + id +"?format=json");
  }

  getVehicleFromURL(url: string) : Observable<Vehicle> {
    return this.http.get<Vehicle>(url +"?format=json");
  }


  findVehicle(
    search = '',
    ordering = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3) :  Observable<Vehicle[]> {

    let page = pageNumber +1;

    return this.http.get(url, {
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

  countVehicle(search = '') :  Observable<number> {

    return this.http.get(url, {
        params: new HttpParams()
            .set('search', search)
    }).pipe(
        map(res =>  res["count"])
    );
  
  }
}
