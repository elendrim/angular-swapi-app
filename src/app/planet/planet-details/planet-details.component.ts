import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService } from '../../film.service';
import { PlanetService, Planet } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {
  planet = signal<Planet | undefined>(undefined);

  countResidents : string;
  countFilms : string;
  
  

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
      
      const id = params.get('planetId');

      this.planetService.getPlanet(id).subscribe(data => {
        data.id = id;
        this.planet.set(data);
        this.countFilms = this.helperService.getBadgeNumber(data.films.length);
        this.countResidents = this.helperService.getBadgeNumber(data.residents.length);
      });
    });
  }

}

