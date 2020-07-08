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
  selector: 'app-people-property',
  templateUrl: './people-property.component.html',
  styleUrls: ['./people-property.component.css']
})
export class PeoplePropertyComponent implements OnInit {

  people : People;
  homeworld : Planet;
  

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
      
      var id = params.get('peopleId');
      
      this.peopleService.getPeople(id).subscribe(data => {
        this.people = data;
        this.people.id = id;

        // homeworld
        var obs = this.planetService.getPlanetFromURL(this.people.homeworld);
        obs.subscribe(planet => {

          var planetId = this.helperService.getIdFromUrl(this.people.homeworld);
          
          this.homeworld = planet; 
          this.homeworld.id = planetId;

        });
      });

      

    });
  }

}

