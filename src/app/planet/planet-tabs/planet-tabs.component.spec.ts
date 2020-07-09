import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetTabsComponent } from './planet-tabs.component';

describe('PlanetTabsComponent', () => {
  let component: PlanetTabsComponent;
  let fixture: ComponentFixture<PlanetTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
