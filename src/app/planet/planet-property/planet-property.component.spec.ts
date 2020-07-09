import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetPropertyComponent } from './planet-property.component';

describe('PlanetPropertyComponent', () => {
  let component: PlanetPropertyComponent;
  let fixture: ComponentFixture<PlanetPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
