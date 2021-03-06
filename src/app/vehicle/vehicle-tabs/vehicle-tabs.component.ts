import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import { PeopleService, People } from '../../people.service';
import { VehicleService, Vehicle } from '../../vehicle.service';
import { StarshipService, Starship } from '../../starship.service';
import { SpeciesService, Species } from '../../species.service';
import { FilmService, Film } from '../../film.service';
import { PlanetService, Planet } from '../../planet.service';
import { HelperService } from '../../helper.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';



@Component({
  selector: 'app-vehicle-tabs',
  templateUrl: './vehicle-tabs.component.html',
  styleUrls: ['./vehicle-tabs.component.css']
})
export class VehicleTabsComponent implements OnInit {

  people : People;
  film : Film;
  
  displayedColumnsVehicle: string[] = ['name', 'model', 'vehicle_class', 'manufacturer'];
  dataSourceVehicle = new MatTableDataSource<Vehicle>();


  
  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private vehicleService: VehicleService,
    private starshipService: StarshipService,
    private speciesService: SpeciesService,
    private filmService: FilmService,
    private planetService: PlanetService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    
    this.route.parent.paramMap.subscribe(params => {

      // from people 
      let peopleId = params.get('peopleId');
      if ( peopleId ) {

        this.peopleService.getPeople(peopleId).subscribe(data => {
          this.people = data;
          this.people.id = peopleId;

          // vehicles
          let vehicles = new Array<Vehicle>();
          this.people.vehicles.forEach( element=> {
            let obs = this.vehicleService.getVehicleFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              vehicles.push(data);
              this.dataSourceVehicle.data = vehicles; 
            });
          });
       
        });
      }

      // from film
      let filmId = params.get('filmId');
      if ( filmId ) {

        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // vehicles
          let vehicles = new Array<Vehicle>();
          this.film.vehicles.forEach( element=> {
            let obs = this.vehicleService.getVehicleFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              vehicles.push(data);
              this.dataSourceVehicle.data = vehicles; 
            });
          });
        
        });
      }
      

    });
  }



}

