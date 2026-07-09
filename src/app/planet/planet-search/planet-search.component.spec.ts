import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, NEVER } from 'rxjs';
import { PlanetService } from '../../planet.service';
import { AngularMaterialModule } from '../../angular-material.module';

import { PlanetSearchComponent } from './planet-search.component';

describe('PlanetSearchComponent', () => {
  let component: PlanetSearchComponent;
  let fixture: ComponentFixture<PlanetSearchComponent>;

  const mockPlanetService = {
    findPlanet: () => of([{ id: '1', name: 'Tatooine', url: 'https://swapi.dev/api/planet/1/' }]),
    countPlanet: () => NEVER
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [ PlanetSearchComponent ],
      providers: [
        { provide: PlanetService, useValue: mockPlanetService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table row with the planet name', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.name-cell').textContent).toContain('Tatooine');
  });
});
