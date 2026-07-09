import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService, Starship } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css']
})
export class StarshipDetailsComponent implements OnInit {
  starship = signal<Starship | undefined>(undefined);

  countFilms : string;
  countPilots : string;
  

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
      
      const id = params.get('starshipId');

      this.starshipService.getStarship(id).subscribe(data => {
        data.id = id;
        this.starship.set(data);
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        this.countPilots = this.helperService.getBadgeNumber(data.pilots.length);
      });
    });
  }

}

