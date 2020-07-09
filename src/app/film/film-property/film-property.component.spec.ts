import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPropertyComponent } from './film-property.component';

describe('FilmPropertyComponent', () => {
  let component: FilmPropertyComponent;
  let fixture: ComponentFixture<FilmPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
