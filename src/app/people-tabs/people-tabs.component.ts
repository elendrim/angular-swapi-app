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
  selector: 'app-people-tabs',
  templateUrl: './people-tabs.component.html',
  styleUrls: ['./people-tabs.component.css']
})
export class PeopleTabsComponent implements OnInit {

  starship : Starship;
  film : Film;
  
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
      var filmId = params.get('starshipId');
      if ( filmId ) {

        this.starshipService.getStarship(filmId).subscribe(data => {
          this.starship = data;
          this.starship.id = filmId;

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
    });
  }



}

