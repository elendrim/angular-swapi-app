import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {PlanetService, Planet} from "../../planet.service"
import {HelperService} from "../../helper.service"


@Component({
  selector: 'app-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: ['./planet-search.component.css']
})
export class PlanetSearchComponent implements AfterViewInit, OnInit {

  dataSource: PlanetDataSource;
  displayedColumns= ["id", "name", "diameter", "rotation_period", "orbital_period", "gravity", "population", "climate"] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private planetService: PlanetService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.dataSource = new PlanetDataSource(this.planetService, this.helperService);
    this.dataSource.loadPlanet( '', '', 'asc', 0, this.pageSize);
    this.planetService
      .countPlanet('',)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadPlanetPage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadPlanetPage())
        )
        .subscribe();
  }

  loadPlanetPage() {

    this.planetService
      .countPlanet(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadPlanet(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
}

}


export class PlanetDataSource implements DataSource<Planet> {

  private planetSubject = new BehaviorSubject<Planet[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private planetService: PlanetService,
    private helperService: HelperService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Planet[]> {
    return this.planetSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.planetSubject.complete();
    this.loadingSubject.complete();
  }

  loadPlanet(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.planetService.findPlanet(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(planetTab => {

      planetTab.forEach(planet => {
        var id = this.helperService.getIdFromUrl(planet.url);
        planet.id = id;  
      });
      
      this.planetSubject.next(planetTab);
    });

  }  
}