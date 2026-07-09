import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, NEVER } from 'rxjs';
import { StarshipService } from '../../starship.service';
import { MATERIAL_MODULES } from '../../angular-material.module';

import { StarshipSearchComponent } from './starship-search.component';

describe('StarshipSearchComponent', () => {
  let component: StarshipSearchComponent;
  let fixture: ComponentFixture<StarshipSearchComponent>;

  const mockStarshipService = {
    findStarship: () => of([{ id: '1', name: 'Millennium Falcon', url: 'https://swapi.dev/api/starship/1/' }]),
    countStarship: () => NEVER
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ StarshipSearchComponent ],
      providers: [
        { provide: StarshipService, useValue: mockStarshipService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a table row with the starship name', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.name-cell').textContent).toContain('Millennium Falcon');
  });
});
