import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipPropertyComponent } from './starship-property.component';

describe('StarshipPropertyComponent', () => {
  let component: StarshipPropertyComponent;
  let fixture: ComponentFixture<StarshipPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarshipPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
