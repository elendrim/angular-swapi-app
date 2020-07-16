
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
  selector: 'app-film-tabs',
  templateUrl: './film-tabs.component.html',
  styleUrls: ['./film-tabs.component.css']
})
export class FilmTabsComponent implements OnInit {

  starship : Starship;
  people : People;
  planet : Planet;
  species : Species;
  vehicle : Vehicle;
  
  displayedColumnsFilms: string[] = ['title', 'episode_id', 'director', 'producer',];
  dataSourceFilms = new MatTableDataSource<Film>();


  
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
      

      // from starship
      let starshipId = params.get('starshipId');
      if ( starshipId ) {
        this.starshipService.getStarship(starshipId).subscribe(data => {
          this.starship = data;
          this.starship.id = starshipId;

          // films
          let films = new Array<Film>();
          this.starship.films.forEach( element=> {
            let obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
        });
      }

      // from people
      let planetId = params.get('peopleId');
      if ( planetId ) {
        this.peopleService.getPeople(planetId).subscribe(data => {
          this.people = data;
          this.people.id = planetId;

          // films
          let films = new Array<Film>();
          this.people.films.forEach( element=> {
            let obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
        });
      }


      // from planet
      let planetId = params.get('planetId');
      if ( planetId ) {
        this.planetService.getPlanet(planetId).subscribe(data => {
          this.planet = data;
          this.planet.id = planetId;

          // films
          let films = new Array<Film>();
          this.planet.films.forEach( element=> {
            let obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
          
        });
      }


      // from species
      let speciesId = params.get('speciesId');
      if ( speciesId ) {
        this.speciesService.getSpecies(speciesId).subscribe(data => {
          this.species = data;
          this.species.id = planetId;

          // films
          let films = new Array<Film>();
          this.species.films.forEach( element=> {
            let obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
   
        });
      }


      // from vehicle
      let vehicleId = params.get('vehicleId');
      if ( vehicleId ) {
        this.vehicleService.getVehicle(vehicleId).subscribe(data => {
          this.vehicle = data;
          this.vehicle.id = planetId;

          // films
          let films = new Array<Film>();
          this.vehicle.films.forEach( element=> {
            let obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
   
        });
      }



    });
    
  }



}

