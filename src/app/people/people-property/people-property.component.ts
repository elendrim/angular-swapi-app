import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService, People } from '../../people.service';
import { VehicleService } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService } from '../../film.service';
import { PlanetService, Planet } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-people-property',
  templateUrl: './people-property.component.html',
  styleUrls: ['./people-property.component.css']
})
export class PeoplePropertyComponent implements OnInit {
  people = signal<People | undefined>(undefined);
  homeworld = signal<Planet | undefined>(undefined);
  

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
      
      const id = params.get('peopleId');
      
      this.peopleService.getPeople(id).subscribe(data => {
        data.id = id;
        this.people.set(data);

        // homeworld
        const obs = this.planetService.getPlanetFromURL(data.homeworld);
        obs.subscribe(planet => {

          const planetId = this.helperService.getIdFromUrl(data.homeworld);
          
          planet.id = planetId;
          this.homeworld.set(planet);

        });
      });

      

    });
  }

}

