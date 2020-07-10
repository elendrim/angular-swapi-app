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
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {

  species : Species;

  countFilms : string;
  countPeople : string;
  

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
      
      var id = params.get('speciesId');

      this.speciesService.getSpecies(id).subscribe(data => {
        this.species = data;
        this.species.id = id;
        this.countPeople = this.helperService.getBadgeNumber(data.people.length);
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        
      });
    });
  }

}

