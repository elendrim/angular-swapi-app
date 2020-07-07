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
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css']
})
export class StarshipDetailsComponent implements OnInit {

  starship : Starship;

  countFilms : string;
  countPilots : string;
  

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
      
      var id = params.get('starshipId');

      this.starshipService.getStarship(id).subscribe(data => {
        this.starship = data;
        this.starship.id = id;
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        this.countPilots = this.helperService.getBadgeNumber(data.pilots.length);
      });
    });
  }

}

