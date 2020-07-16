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
      let filmId = params.get('filmId');
      if ( filmId ) {
        this.filmService.getFilm(filmId).subscribe(data => {
          this.film = data;
          this.film.id = filmId;

          // characters
          let planets = new Array<Planet>();
          this.film.planets.forEach( element=> {
            let obs = this.planetService.getPlanetFromURL(element);

            obs.subscribe(data => {

              let id = this.helperService.getIdFromUrl(element);
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

