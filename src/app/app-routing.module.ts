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


const routes: Routes = [
  //{ path: '', component: ProductListComponent },
  { path: 'people/search', component: PeopleSearchComponent },
  { path: 'people/:peopleId', component: PeopleDetailsComponent },
  { path: 'film/search', component: FilmSearchComponent },
  { path: 'film/:filmId', component: FilmDetailsComponent },

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
