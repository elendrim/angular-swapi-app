import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PeopleService, People } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService, Species } from '../../species.service';
import { FilmService, Film } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
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
      const peopleId = params.get('peopleId');
      if ( peopleId ) {
        this.peopleService.getPeople(peopleId).subscribe(data => {
          this.people = data;
          this.people.id = peopleId;

          // characters
          const species = new Array<Species>();
          this.people.species.forEach( element=> {
            const obs = this.speciesService.getSpeciesFromURL(element);

            obs.subscribe(data => {

              const id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              species.push(data);
              this.dataSourceSpecies.data = species; 
            });
          });


        });
      }

      // from film
      const filmId = params.get('filmId');
      if ( filmId ) {
        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // characters
          const species = new Array<Species>();
          this.film.species.forEach( element=> {
            const obs = this.speciesService.getSpeciesFromURL(element);

            obs.subscribe(data => {

              const id = this.helperService.getIdFromUrl(element);
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

