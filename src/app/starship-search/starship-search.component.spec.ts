import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipSearchComponent } from './starship-search.component';

describe('StarshipSearchComponent', () => {
  let component: StarshipSearchComponent;
  let fixture: ComponentFixture<StarshipSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarshipSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
