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
  selector: 'app-starship-tabs',
  templateUrl: './starship-tabs.component.html',
  styleUrls: ['./starship-tabs.component.css']
})
export class StarshipTabsComponent implements OnInit {

  people : People;
  film : Film;
  
  displayedColumnsStarship: string[] = ['name', 'model', 'starship_class', 'manufacturer'];
  dataSourceStarship = new MatTableDataSource<Starship>();


  
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
      var filmId = params.get('peopleId');
      if ( filmId ) {
        this.peopleService.getPeople(filmId).subscribe(data => {
          this.people = data;
          this.people.id = filmId;

          // starships
          var starships = new Array<Starship>();
          this.people.starships.forEach( element=> {
            var obs = this.starshipService.getStarshipFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              starships.push(data);
              this.dataSourceStarship.data = starships; 
            });
          });


        });
      }

      // from people
      var filmId = params.get('filmId');
      if ( filmId ) {
        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // starships
          var starships = new Array<Starship>();
          this.film.starships.forEach( element=> {
            var obs = this.starshipService.getStarshipFromURL(element);

            obs.subscribe(data => {

              var id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              starships.push(data);
              this.dataSourceStarship.data = starships; 
            });
          });


        });
      }

    });
  }



}

