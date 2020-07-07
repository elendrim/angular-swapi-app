import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmTabsComponent } from './film-tabs.component';

describe('FilmTabsComponent', () => {
  let component: FilmTabsComponent;
  let fixture: ComponentFixture<FilmTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
