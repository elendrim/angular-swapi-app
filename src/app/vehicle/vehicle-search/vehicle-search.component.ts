import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError, of, fromEvent } from 'rxjs';
import { catchError, finalize, retry, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { MatPaginator } from '@angular/material/paginator';

import {VehicleService, Vehicle} from "../../vehicle.service"
import {HelperService} from "../../helper.service"
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const displayedColumnsXSmall= [ "name", "manufacturer"] ;
const displayedColumnsSmall= [ "name", "manufacturer", "model", "vehicle_class"] ;
const displayedColumnsMedium= [ "name", "manufacturer", "model", "vehicle_class", "length"] ;
const displayedColumnsLarge= ["name", "manufacturer", "model", "vehicle_class", "length"] ;
const displayedColumnsXLarge= ["id", "name", "manufacturer", "model", "vehicle_class", "length"] ;


@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements AfterViewInit, OnInit {

  dataSource: VehicleDataSource;
  displayedColumns= displayedColumnsXLarge;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('inputSearch') input: ElementRef;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10];


  constructor(
    private vehicleService: VehicleService, 
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
    this.dataSource = new VehicleDataSource(this.vehicleService, this.helperService);
    this.dataSource.loadVehicle( '', '', 'asc', 0, this.pageSize);
    this.vehicleService
      .countVehicle('',)
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
            this.loadVehiclePage();
        })
    )
    .subscribe();

    this.paginator.page
        .pipe(
            tap(() => this.loadVehiclePage())
        )
        .subscribe();
  }

  loadVehiclePage() {

    this.vehicleService
      .countVehicle(this.input.nativeElement.value)
      .subscribe(data => {
        this.paginator.length = data
        this.length = data; 
      });

    this.dataSource.loadVehicle(
        this.input.nativeElement.value,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

}


export class VehicleDataSource implements DataSource<Vehicle> {

  private vehicleSubject = new BehaviorSubject<Vehicle[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private vehicleService: VehicleService,
    private helperService: HelperService,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Vehicle[]> {
    return this.vehicleSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.vehicleSubject.complete();
    this.loadingSubject.complete();
  }

  loadVehicle(search: string, 
              ordering: string, sortOrder: string, pageNumber: number, pageSize: number) : void {
    this.loadingSubject.next(true);

    this.vehicleService.findVehicle(search, ordering, sortOrder,
        pageNumber, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(vehicleTab => {

      vehicleTab.forEach(vehicle => {
        let id = this.helperService.getIdFromUrl(vehicle.url);
        vehicle.id = id;  
      });
      
      this.vehicleSubject.next(vehicleTab);
    });

  }  
}