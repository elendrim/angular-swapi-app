
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
      
      var starshipId = params.get('starshipId');
      if ( starshipId ) {
        this.starshipService.getStarship(starshipId).subscribe(data => {
          this.starship = data;
          this.starship.id = starshipId;

          // films
          var films = new Array<Film>();
          this.starship.films.forEach( element=> {
            var obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              films.push(data);
              this.dataSourceFilms.data = films; 
            });
          });
        });
      }


      var peopleId = params.get('peopleId');
      if ( peopleId ) {
        this.peopleService.getPeople(peopleId).subscribe(data => {
          this.people = data;
          this.people.id = peopleId;

          // films
          var films = new Array<Film>();
          this.people.films.forEach( element=> {
            var obs = this.filmService.getFilmFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
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

