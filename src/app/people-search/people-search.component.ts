import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {PeopleService, People} from "../people.service"


@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.css']
})
export class PeopleSearchComponent implements AfterViewInit, OnInit {

  dataSource: PeopleDataSource;
  displayedColumns= ["id", "name", "birth_year", "eye_color", "gender", "hair_color", "height", "mass", "skin_color"] ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.dataSource = new PeopleDataSource(this.peopleService);
    this.dataSource.loadPeople( '', '', 'asc', 0, this.pageSize);
    this.peopleService
      .countPeople('',)
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
            this.loadPeoplePage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadPeoplePage())
        )
        .subscribe();
  }

  loadPeoplePage() {

    this.peopleService
      .countPeople(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadPeople(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
}

}


export class PeopleDataSource implements DataSource<People> {

  private peopleSubject = new BehaviorSubject<People[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private peopleService: PeopleService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<People[]> {
    return this.peopleSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.peopleSubject.complete();
    this.loadingSubject.complete();
  }

  loadPeople(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.peopleService.findPeople(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(peopleTab => {

      peopleTab.forEach(people => {
        var id = people.url.substring(people.url.lastIndexOf('/') + 1);
        if( !id ) {
          // remove last caracter
          var subsUrl = people.url.substring(0, people.url.length -1 );
          id = subsUrl.substring(subsUrl.lastIndexOf('/') + 1);
        }
        people.id = id;  
      });
      
      this.peopleSubject.next(peopleTab);
    });

  }  
}