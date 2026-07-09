import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService, Film } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film = signal<Film | undefined>(undefined);

  countFilms : string;
  countVehicles : string;
  countStarships : string;
  countSpecies : string;
  countCharacters : string;
  countPlanets : string;
  

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
      
      const id = params.get('filmId');

      this.filmService.getFilm(id).subscribe(data => {
        data.id = id;
        this.film.set(data);
        this.countVehicles = this.helperService.getBadgeNumber(data.vehicles.length);
        this.countStarships = this.helperService.getBadgeNumber(data.starships.length);
        this.countSpecies = this.helperService.getBadgeNumber(data.species.length);
        this.countCharacters = this.helperService.getBadgeNumber(data.characters.length);
        this.countPlanets = this.helperService.getBadgeNumber(data.planets.length);
        
      });
    });
  }

}

