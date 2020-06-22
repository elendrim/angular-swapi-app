import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService, People } from '../people.service';




@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  people : People;

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      
      // let people = { 
      //   id: params.get('peopleId'),
      //   name: "Jane", 
      //   birth_year: "User" 
      // };
      // this.people = people;

      let id = params.get('peopleId');

      this.peopleService.getPeople(id).subscribe(data => this.people = {
        id : id,
        name : (data as any).name,
        birth_year : (data as any).birth_year,
        height:  (data as any).height,
        mass:  (data as any).mass,
        hair_color:  (data as any).hair_color,
        skin_color:  (data as any).skin_color,
        eye_color:  (data as any).eye_color,
        gender:  (data as any).gender,
        homeworld:  (data as any).homeworld,
        films:  (data as any).films,
        species:  (data as any).species,
        vehicles:  (data as any).vehicles,
        starships:  (data as any).starships,
        url:  (data as any).url,
        created:  (data as any).created,
        edited:  (data as any).edited,
        
      });

      
    });
  }

}
