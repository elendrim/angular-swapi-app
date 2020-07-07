import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {FilmService, Film} from "../film.service"
import {HelperService} from "../helper.service"
import { StarshipService, Starship } from '../starship.service';



@Component({
  selector: 'app-starship-search',
  templateUrl: './starship-search.component.html',
  styleUrls: ['./starship-search.component.css']
})
export class StarshipSearchComponent implements AfterViewInit, OnInit {

  dataSource: StarshipDataSource;
  displayedColumns= ["id", "name", "manufacturer", "model", "starship_class", "MGLT"] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private starshipService: StarshipService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.dataSource = new StarshipDataSource(this.starshipService, this.helperService);
    this.dataSource.loadStarship( '', '', 'asc', 0, this.pageSize);
    this.starshipService
      .countStarship('',)
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
            this.loadStarshipPage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadStarshipPage())
        )
        .subscribe();
  }

  loadStarshipPage() {

    this.starshipService
      .countStarship(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadStarship(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

}


export class StarshipDataSource implements DataSource<Starship> {

  private starshipSubject = new BehaviorSubject<Starship[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private starshipService: StarshipService,
    private helperService: HelperService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Starship[]> {
    return this.starshipSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.starshipSubject.complete();
    this.loadingSubject.complete();
  }

  loadStarship(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.starshipService.findStarship(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(starshipTab => {

      starshipTab.forEach(starship => {
        var id = this.helperService.getIdFromUrl(starship.url);
        starship.id = id;  
      });
      
      this.starshipSubject.next(starshipTab);
    });

  }  
}