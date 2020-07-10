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
  selector: 'app-people-tabs',
  templateUrl: './people-tabs.component.html',
  styleUrls: ['./people-tabs.component.css']
})
export class PeopleTabsComponent implements OnInit {

  starship : Starship;
  film : Film;
  planet : Planet;
  species : Species;
  
  displayedColumnsPeople: string[] = ['name', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height'];
  dataSourcePeople = new MatTableDataSource<People>();


  
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
      
      // from starships
      var starshipId = params.get('starshipId');
      if ( starshipId ) {

        this.starshipService.getStarship(starshipId).subscribe(data => {
          this.starship = data;
          this.starship.id = starshipId;

          // characters
          var people = new Array<People>();
          this.starship.pilots.forEach( element=> {
            var obs = this.peopleService.getPeopleFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              people.push(data);
              this.dataSourcePeople.data = people; 
            });
          });


        });
      }

      // from film
      var filmId = params.get('filmId');
      if ( filmId ) {

        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // characters
          var people = new Array<People>();
          this.film.characters.forEach( element=> {
            var obs = this.peopleService.getPeopleFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              people.push(data);
              this.dataSourcePeople.data = people; 
            });
          });


        });
      }

      // from planet
      var planetId = params.get('planetId');
      if ( planetId ) {

        this.planetService.getPlanet(planetId).subscribe(data => {
          this.planet = data;
          this.planet.id = planetId;

          // characters
          var people = new Array<People>();
          this.planet.residents.forEach( element=> {
            var obs = this.peopleService.getPeopleFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              people.push(data);
              this.dataSourcePeople.data = people; 
            });
          });


        });
      }


      // from species
      var speciesId = params.get('speciesId');
      if ( speciesId ) {

        this.speciesService.getSpecies(speciesId).subscribe(data => {
          this.species = data;
          this.species.id = speciesId;

          // characters
          var people = new Array<People>();
          this.species.people.forEach( element=> {
            var obs = this.peopleService.getPeopleFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              people.push(data);
              this.dataSourcePeople.data = people; 
            });
          });


        });
      }
      
    });

  }



}

