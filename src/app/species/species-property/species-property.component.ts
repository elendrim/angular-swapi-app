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
  selector: 'app-species-property',
  templateUrl: './species-property.component.html',
  styleUrls: ['./species-property.component.css']
})
export class SpeciesPropertyComponent implements OnInit {

  species : Species;
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
      
      var id = params.get('speciesId');
      
      this.speciesService.getSpecies(id).subscribe(data => {
        this.species = data;
        this.species.id = id;

        // homeworld
        var obs = this.planetService.getPlanetFromURL(this.species.homeworld);
        obs.subscribe(planet => {

          var planetId = this.helperService.getIdFromUrl(this.species.homeworld);
          
          this.homeworld = planet; 
          this.homeworld.id = planetId;

        });
      });

      

    });
  }

}

