import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, NEVER } from 'rxjs';
import { FilmService } from '../../film.service';
import { AngularMaterialModule } from '../../angular-material.module';

import { FilmSearchComponent } from './film-search.component';

describe('FilmSearchComponent', () => {
  let component: FilmSearchComponent;
  let fixture: ComponentFixture<FilmSearchComponent>;

  const mockFilmService = {
    findFilm: () => of([{ id: '1', title: 'A New Hope', url: 'https://swapi.dev/api/film/1/' }]),
    countFilm: () => NEVER
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [ FilmSearchComponent ],
      providers: [
        { provide: FilmService, useValue: mockFilmService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table row with the film title', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.name-cell').textContent).toContain('A New Hope');
  });
});
