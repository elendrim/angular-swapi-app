import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { PeopleDetailsComponent } from './people/people-details/people-details.component';
import { PeopleSearchComponent } from './people/people-search/people-search.component';
import { AboutComponent } from './about/about.component';
import { FilmSearchComponent } from './film/film-search/film-search.component';
import { FilmDetailsComponent } from './film/film-details/film-details.component';
import { StarshipDetailsComponent } from './starship/starship-details/starship-details.component';
import { StarshipPropertyComponent } from './starship/starship-property/starship-property.component';
import { FilmTabsComponent } from './film/film-tabs/film-tabs.component';
import { PeopleTabsComponent } from './people/people-tabs/people-tabs.component';
import { StarshipSearchComponent } from './starship/starship-search/starship-search.component';
import { PeoplePropertyComponent } from './people/people-property/people-property.component';
import { VehicleTabsComponent } from './vehicle/vehicle-tabs/vehicle-tabs.component';
import { StarshipTabsComponent } from './starship/starship-tabs/starship-tabs.component';
import { SpeciesTabsComponent } from './species/species-tabs/species-tabs.component';
import { FilmPropertyComponent } from './film/film-property/film-property.component';
import { PlanetTabsComponent } from './planet/planet-tabs/planet-tabs.component';
import { PlanetSearchComponent } from './planet/planet-search/planet-search.component';
import { PlanetDetailsComponent } from './planet/planet-details/planet-details.component';
import { PlanetPropertyComponent } from './planet/planet-property/planet-property.component';


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
    PlanetSearchComponent,
    PlanetDetailsComponent,
    PlanetPropertyComponent,
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
