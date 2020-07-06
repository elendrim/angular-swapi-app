import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { AboutComponent } from './about/about.component';
import { FilmSearchComponent } from './film-search/film-search.component';
import { FilmDetailsComponent } from './film-details/film-details.component';


const routes: Routes = [
  //{ path: '', component: ProductListComponent },
  { path: 'people/search', component: PeopleSearchComponent },
  { path: 'people/:peopleId', component: PeopleDetailsComponent },
  { path: 'film/search', component: FilmSearchComponent },
  { path: 'film/:filmId', component: FilmDetailsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
