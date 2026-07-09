import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, NEVER } from 'rxjs';
import { SpeciesService } from '../../species.service';
import { AngularMaterialModule } from '../../angular-material.module';

import { SpeciesSearchComponent } from './species-search.component';

describe('SpeciesSearchComponent', () => {
  let component: SpeciesSearchComponent;
  let fixture: ComponentFixture<SpeciesSearchComponent>;

  const mockSpeciesService = {
    findSpecies: () => of([{ id: '1', name: 'Human', url: 'https://swapi.dev/api/species/1/' }]),
    countSpecies: () => NEVER
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [ SpeciesSearchComponent ],
      providers: [
        { provide: SpeciesService, useValue: mockSpeciesService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table row with the species name', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.name-cell').textContent).toContain('Human');
  });
});
