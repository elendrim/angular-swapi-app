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
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  film : Film;

  countFilms : string;
  countVehicles : string;
  countStarships : string;
  countSpecies : string;
  countCharacters : string;
  countPlanets : string;
  

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
      
      var id = params.get('filmId');

      this.filmService.getFilm(id).subscribe(data => {
        this.film = data;
        this.film.id = id;
        this.countVehicles = this.helperService.getBadgeNumber(data.vehicles.length);
        this.countStarships = this.helperService.getBadgeNumber(data.starships.length);
        this.countSpecies = this.helperService.getBadgeNumber(data.species.length);
        this.countCharacters = this.helperService.getBadgeNumber(data.characters.length);
        this.countPlanets = this.helperService.getBadgeNumber(data.planets.length);
        
      });
    });
  }

}

