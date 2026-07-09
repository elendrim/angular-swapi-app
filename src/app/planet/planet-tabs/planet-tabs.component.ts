import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PeopleService } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService, Film } from '../../film.service';
import { PlanetService, Planet } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-planet-tabs',
  templateUrl: './planet-tabs.component.html',
  styleUrls: ['./planet-tabs.component.css']
})
export class PlanetTabsComponent implements OnInit {

  film : Film;
  
  displayedColumnsPlanet: string[] = ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population'];
  dataSourcePlanet = new MatTableDataSource<Planet>();



  
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
      
      // from film
      const filmId = params.get('filmId');
      if ( filmId ) {
        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // characters
          const planets = new Array<Planet>();
          this.film.planets.forEach( element=> {
            const obs = this.planetService.getPlanetFromURL(element);

            obs.subscribe(data => {

              const id = this.helperService.getIdFromUrl(element);
              data.id = id; 

              planets.push(data);
              this.dataSourcePlanet.data = planets; 
            });
          });


        });
      }

    });
  }



}

