import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from '../../people.service';
import { VehicleService, Vehicle } from '../../vehicle.service';
import { StarshipService } from '../../starship.service';
import { SpeciesService } from '../../species.service';
import { FilmService } from '../../film.service';
import { PlanetService } from '../../planet.service';
import { HelperService } from '../../helper.service';



@Component({
  standalone: false,
  selector: 'app-vehicle-property',
  templateUrl: './vehicle-property.component.html',
  styleUrls: ['./vehicle-property.component.css']
})
export class VehiclePropertyComponent implements OnInit {
  vehicle = signal<Vehicle | undefined>(undefined);
  

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
      
      const id = params.get('vehicleId');
      this.vehicleService.getVehicle(id).subscribe(data => {
        data.id = id;
        this.vehicle.set(data);
      });
    });
  }

}

