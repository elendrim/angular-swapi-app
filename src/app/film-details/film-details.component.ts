

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
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  film : Film;
  
  displayedColumnsVehicle: string[] = ['name', 'model', 'vehicle_class', 'manufacturer'];
  dataSourceVehicle = new MatTableDataSource<Vehicle>();


  displayedColumnsStarship: string[] = ['name', 'model', 'starship_class', 'manufacturer'];
  dataSourceStarship = new MatTableDataSource<Starship>();

  displayedColumnsSpecies: string[] = ['name', 'classification', 'designation'];
  dataSourceSpecies = new MatTableDataSource<Species>();
  
  displayedColumnsPeople: string[] = ['name', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height'];
  dataSourcePeople = new MatTableDataSource<People>();

  displayedColumnsPlanet: string[] = ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population'];
  dataSourcePlanet = new MatTableDataSource<Planet>();

  @ViewChild('tabGroup') set localTabGroup(localTabGroup: MatTabGroup) {
    if(localTabGroup) { // initially setter gets called with undefined
        var index : string = localStorage.getItem('filmDetailsTabLocation') || "0"; // get stored number or zero if there is nothing stored
        localTabGroup.selectedIndex = parseInt(index); // with tabGroup being the MatTabGroup accessed through ViewChild
    }
 }

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
    
    this.route.paramMap.subscribe(params => {
      
      var id = params.get('filmId');

      this.filmService.getFilm(id).subscribe(data => {
        this.film = data;
        this.film.id = id;

        // vehicles
        var vehicles = new Array<Vehicle>();
        this.film.vehicles.forEach( element=> {
          
          var obs = this.vehicleService.getVehicleFromURL(element);

          obs.subscribe(data => {

            vehicles.push(data);
            this.dataSourceVehicle.data = vehicles; 
            
          });
        });


        // starships
        var starships = new Array<Starship>();
        this.film.starships.forEach( element=> {
          var obs = this.starshipService.getStarshipFromURL(element);

          obs.subscribe(data => {
            starships.push(data);
            this.dataSourceStarship.data = starships; 
          });
        });

        // species
        var species = new Array<Species>();
        this.film.species.forEach( element=> {
          var obs = this.speciesService.getSpeciesFromURL(element);

          obs.subscribe(data => {
            species.push(data);
            this.dataSourceSpecies.data = species; 
          });
        });

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

        // planets
        var planets = new Array<Planet>();
        this.film.planets.forEach( element=> {
          var obs = this.planetService.getPlanetFromURL(element);

          obs.subscribe(data => {

            var id = this.helperService.getIdFromUrl(element);
            data.id = id; 

            planets.push(data);
            this.dataSourcePlanet.data = planets; 
          });
        });


      });
    });
  }
  
  handleMatTabChange(event: MatTabChangeEvent) : void {
    localStorage.setItem('filmDetailsTabLocation', event.index.toString());
  }

}

