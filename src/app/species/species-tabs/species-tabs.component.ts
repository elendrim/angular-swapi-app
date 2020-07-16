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
  selector: 'app-species-tabs',
  templateUrl: './species-tabs.component.html',
  styleUrls: ['./species-tabs.component.css']
})
export class SpeciesTabsComponent implements OnInit {

  people : People;
  film : Film;
  
  displayedColumnsSpecies: string[] = ['name', 'classification', 'designation'];
  dataSourceSpecies = new MatTableDataSource<Species>();


  
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

          // characters
          let species = new Array<Species>();
          this.people.species.forEach( element=> {
            let obs = this.speciesService.getSpeciesFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              species.push(data);
              this.dataSourceSpecies.data = species; 
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

          // characters
          let species = new Array<Species>();
          this.film.species.forEach( element=> {
            let obs = this.speciesService.getSpeciesFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              species.push(data);
              this.dataSourceSpecies.data = species; 
            });
          });


        });
      }

    });
  }



}

