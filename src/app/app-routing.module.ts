import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleSearchComponent } from './people-search/people-search.component';


const routes: Routes = [
  //{ path: '', component: ProductListComponent },
  { path: 'people/search', component: PeopleSearchComponent },
  { path: 'people/:peopleId', component: PeopleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
