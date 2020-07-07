import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
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


@NgModule({
  declarations: [
    AppComponent,
    PeopleDetailsComponent,
    PeopleSearchComponent,
    AboutComponent,
    FilmSearchComponent,
    FilmDetailsComponent,
    StarshipDetailsComponent,
    StarshipPropertyComponent,
    FilmTabsComponent,
    PeopleTabsComponent,
    StarshipSearchComponent,
    PeoplePropertyComponent,
    VehicleTabsComponent,
    StarshipTabsComponent,
    SpeciesTabsComponent,
    FilmPropertyComponent,
    PlanetTabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
