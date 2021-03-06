import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {SpeciesService, Species} from "../../species.service"
import {HelperService} from "../../helper.service"
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const displayedColumnsXSmall= ['name', 'classification'];
const displayedColumnsSmall= ['name', 'classification', 'designation', 'average_height'];
const displayedColumnsMedium= ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'language'];
const displayedColumnsLarge= ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'language'];
const displayedColumnsXLarge= ['id', 'name', 'classification', 'designation', 'average_height', 'average_lifespan', 'language'];

@Component({
  selector: 'app-species-search',
  templateUrl: './species-search.component.html',
  styleUrls: ['./species-search.component.css']
})
export class SpeciesSearchComponent implements AfterViewInit, OnInit {

  dataSource: SpeciesDataSource;
  displayedColumns: string[] = displayedColumnsXLarge;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private speciesService: SpeciesService,
    private helperService: HelperService,
    private breakpointObserver: BreakpointObserver,
  ) {

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.displayedColumns = displayedColumnsXSmall;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.displayedColumns = displayedColumnsSmall;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.displayedColumns = displayedColumnsMedium;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.displayedColumns = displayedColumnsLarge;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.displayedColumns = displayedColumnsXLarge;
        }
      }
    });

   }

  ngOnInit(): void {
    this.dataSource = new SpeciesDataSource(this.speciesService, this.helperService);
    this.dataSource.loadSpecies( '', '', 'asc', 0, this.pageSize);
    this.speciesService
      .countSpecies('',)
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
            this.loadSpeciesPage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadSpeciesPage())
        )
        .subscribe();
  }

  loadSpeciesPage() {

    this.speciesService
      .countSpecies(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadSpecies(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

}


export class SpeciesDataSource implements DataSource<Species> {

  private speciesSubject = new BehaviorSubject<Species[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private speciesService: SpeciesService,
    private helperService: HelperService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Species[]> {
    return this.speciesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.speciesSubject.complete();
    this.loadingSubject.complete();
  }

  loadSpecies(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.speciesService.findSpecies(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(speciesTab => {

      speciesTab.forEach(species => {
        let id = this.helperService.getIdFromUrl(species.url);
        species.id = id;  
      });
      
      this.speciesSubject.next(speciesTab);
    });

  }  
}