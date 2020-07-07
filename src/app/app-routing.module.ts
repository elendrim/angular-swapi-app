import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { AboutComponent } from './about/about.component';
import { FilmSearchComponent } from './film-search/film-search.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { StarshipPropertyComponent } from './starship-property/starship-property.component';
import { FilmTabsComponent } from './film-tabs/film-tabs.component';
import { PeopleTabsComponent } from './people-tabs/people-tabs.component';
import { StarshipSearchComponent } from './starship-search/starship-search.component';
import { PeoplePropertyComponent } from './people-property/people-property.component';
import { VehicleTabsComponent } from './vehicle-tabs/vehicle-tabs.component';
import { StarshipTabsComponent } from './starship-tabs/starship-tabs.component';
import { SpeciesTabsComponent } from './species-tabs/species-tabs.component';
import { FilmPropertyComponent } from './film-property/film-property.component';
import { PlanetTabsComponent } from './planet-tabs/planet-tabs.component';


const routes: Routes = [
  //{ path: '', component: ProductListComponent },
  { path: 'people/search', component: PeopleSearchComponent },
  { path: 'people/:peopleId', redirectTo: '/people/:peopleId/property', pathMatch: 'full' },
  { path: 'people/:peopleId', component: PeopleDetailsComponent,
    children: [
      {
        path: 'property', 
        component: PeoplePropertyComponent
      },
      {
        path: 'vehicles', 
        component: VehicleTabsComponent
      },
      {
        path: 'starships', 
        component: StarshipTabsComponent
      },
      {
        path: 'species', 
        component: SpeciesTabsComponent
      },
      {
        path: 'films',
        component: FilmTabsComponent 
      }
    ]

  },

  { path: 'film/search', component: FilmSearchComponent },
  { path: 'film/:filmId', redirectTo: '/film/:filmId/property', pathMatch: 'full' },
  { path: 'film/:filmId', component: FilmDetailsComponent,
    children: [
      {
        path: 'property', 
        component: FilmPropertyComponent
      },
      {
        path: 'vehicles', 
        component: VehicleTabsComponent
      },
      {
        path: 'starships', 
        component: StarshipTabsComponent
      },
      {
        path: 'species', 
        component: SpeciesTabsComponent
      },
      {
        path: 'characters',
        component: PeopleTabsComponent 
      },
      {
        path: 'planets',
        component: PlanetTabsComponent 
      }
    ]
  },

  { path: 'starship/search', component: StarshipSearchComponent },
  { path: 'starship/:starshipId', redirectTo: '/starship/:starshipId/property', pathMatch: 'full' },
  { path: 'starship/:starshipId', component: StarshipDetailsComponent,
    children: [
      {
        path: 'property', 
        component: StarshipPropertyComponent
      },
      {
        path: 'films',
        component: FilmTabsComponent 
      },
      {
        path: 'pilots',
        component: PeopleTabsComponent 
      }
    ]

  },
  
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
