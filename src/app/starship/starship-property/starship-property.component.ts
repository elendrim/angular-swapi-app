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
  selector: 'app-starship-property',
  templateUrl: './starship-property.component.html',
  styleUrls: ['./starship-property.component.css']
})
export class StarshipPropertyComponent implements OnInit {
  starship = signal<Starship | undefined>(undefined);
  

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
      
      const id = params.get('starshipId');
      this.starshipService.getStarship(id).subscribe(data => {
        data.id = id;
        this.starship.set(data);
      });
    });
  }

}

