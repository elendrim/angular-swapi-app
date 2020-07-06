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


@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  people : People;
  homeworld : Planet;
  

  displayedColumnsVehicle: string[] = ['name', 'model', 'vehicle_class', 'manufacturer'];
  dataSourceVehicle = new MatTableDataSource<Vehicle>();


  displayedColumnsStarship: string[] = ['name', 'model', 'starship_class', 'manufacturer'];
  dataSourceStarship = new MatTableDataSource<Starship>();

  displayedColumnsSpecies: string[] = ['name', 'classification', 'designation'];
  dataSourceSpecies = new MatTableDataSource<Species>();
  
  displayedColumnsFilms: string[] = ['title', 'episode_id', 'director', 'producer',];
  dataSourceFilms = new MatTableDataSource<Film>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
    this.dataSourceVehicle.paginator = this.paginator;

    this.route.paramMap.subscribe(params => {
      
      var id = params.get('peopleId');

      this.peopleService.getPeople(id).subscribe(data => {
        this.people = data;
        this.people.id = id;

        // homeworld
        var obs = this.planetService.getPlanetFromURL(this.people.homeworld);
        obs.subscribe(planet => {

          var planetId = this.helperService.getIdFromUrl(this.people.homeworld);
          
          this.homeworld = planet; 
          this.homeworld.id = planetId;

        });


        // vehicles
        var vehicles = new Array<Vehicle>();
        this.people.vehicles.forEach( element=> {
          
          var obs = this.vehicleService.getVehicleFromURL(element);

          obs.subscribe(data => {

            vehicles.push(data);
            this.dataSourceVehicle.data = vehicles; 
            
          });
        });


        // starships
        var starships = new Array<Starship>();
        this.people.starships.forEach( element=> {
          var obs = this.starshipService.getStarshipFromURL(element);

          obs.subscribe(data => {
            starships.push(data);
            this.dataSourceStarship.data = starships; 
          });
        });

        // species
        var species = new Array<Species>();
        this.people.species.forEach( element=> {
          var obs = this.speciesService.getSpeciesFromURL(element);

          obs.subscribe(data => {
            species.push(data);
            this.dataSourceSpecies.data = species; 
          });
        });

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
    });
  }

}

