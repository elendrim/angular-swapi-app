import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import { PeopleService, People } from '../people.service';
import { VehicleService, Vehicle } from '../vehicle.service';
import { StarshipService, Starship } from '../starship.service';
import { SpeciesService, Species } from '../species.service';
import { FilmService, Film } from '../film.service';
import { PlanetService, Planet } from '../planet.service';
import { HelperService } from '../helper.service';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';



@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  people : People;

  countFilms : string;
  countVehicles : string;
  countStarships : string;
  countSpecies : string;
  

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
    
    this.route.paramMap.subscribe(params => {
      
      var id = params.get('peopleId');

      this.peopleService.getPeople(id).subscribe(data => {
        this.people = data;
        this.people.id = id;
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        this.countStarships = this.helperService.getBadgeNumber(data.starships.length);
        this.countVehicles = this.helperService.getBadgeNumber(data.vehicles.length);
        this.countSpecies = this.helperService.getBadgeNumber(data.species.length);
      });
    });
  }

}

