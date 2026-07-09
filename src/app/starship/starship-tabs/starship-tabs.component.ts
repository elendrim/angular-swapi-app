import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PeopleService, People } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService, Starship } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService, Film } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
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
      const peopleId = params.get('peopleId');
      if ( peopleId ) {
        this.peopleService.getPeople(peopleId).subscribe(data => {
          this.people = data;
          this.people.id = peopleId;

          // starships
          const starships = new Array<Starship>();
          this.people.starships.forEach( element=> {
            const obs = this.starshipService.getStarshipFromURL(element);

            obs.subscribe(data => {

              const id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              starships.push(data);
              this.dataSourceStarship.data = starships; 
            });
          });


        });
      }

      // from people
      const filmId = params.get('filmId');
      if ( filmId ) {
        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // starships
          const starships = new Array<Starship>();
          this.film.starships.forEach( element=> {
            const obs = this.starshipService.getStarshipFromURL(element);

            obs.subscribe(data => {

              const id = this.helperService.getIdFromUrl(element);
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

