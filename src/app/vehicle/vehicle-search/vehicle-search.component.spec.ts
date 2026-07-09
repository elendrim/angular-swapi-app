import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, NEVER } from 'rxjs';
import { VehicleService } from '../../vehicle.service';
import { AngularMaterialModule } from '../../angular-material.module';

import { VehicleSearchComponent } from './vehicle-search.component';

describe('VehicleSearchComponent', () => {
  let component: VehicleSearchComponent;
  let fixture: ComponentFixture<VehicleSearchComponent>;

  const mockVehicleService = {
    findVehicle: () => of([{ id: '1', name: 'Sand Crawler', url: 'https://swapi.dev/api/vehicle/1/' }]),
    countVehicle: () => NEVER
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [ VehicleSearchComponent ],
      providers: [
        { provide: VehicleService, useValue: mockVehicleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table row with the vehicle name', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.name-cell').textContent).toContain('Sand Crawler');
  });
});
