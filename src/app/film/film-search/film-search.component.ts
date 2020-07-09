import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {FilmService, Film} from "../../film.service"
import {HelperService} from "../../helper.service"



@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements AfterViewInit, OnInit {

  dataSource: FilmDataSource;
  displayedColumns= ["id", "title", "episode_id", "director", "producer", "release_date"] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private filmService: FilmService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.dataSource = new FilmDataSource(this.filmService, this.helperService);
    this.dataSource.loadFilm( '', '', 'asc', 0, this.pageSize);
    this.filmService
      .countFilm('',)
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
            this.loadFilmPage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadFilmPage())
        )
        .subscribe();
  }

  loadFilmPage() {

    this.filmService
      .countFilm(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadFilm(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

}


export class FilmDataSource implements DataSource<Film> {

  private filmSubject = new BehaviorSubject<Film[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private filmService: FilmService,
    private helperService: HelperService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Film[]> {
    return this.filmSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.filmSubject.complete();
    this.loadingSubject.complete();
  }

  loadFilm(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.filmService.findFilm(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(filmTab => {

      filmTab.forEach(film => {
        var id = this.helperService.getIdFromUrl(film.url);
        film.id = id;  
      });
      
      this.filmSubject.next(filmTab);
    });

  }  
}