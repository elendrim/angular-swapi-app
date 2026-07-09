import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService, People } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  people = signal<People | undefined>(undefined);

  countFilms : string;
  countVehicles : string;
  countStarships : string;
  countSpecies : string;
  

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
      
      const id = params.get('peopleId');

      this.peopleService.getPeople(id).subscribe(data => {
        data.id = id;
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        this.countStarships = this.helperService.getBadgeNumber(data.starships.length);
        this.countVehicles = this.helperService.getBadgeNumber(data.vehicles.length);
        this.countSpecies = this.helperService.getBadgeNumber(data.species.length);
        this.people.set(data);
      });
    });
  }

}

