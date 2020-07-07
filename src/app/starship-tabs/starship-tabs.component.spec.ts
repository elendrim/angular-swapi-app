import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipTabsComponent } from './starship-tabs.component';

describe('StarshipTabsComponent', () => {
  let component: StarshipTabsComponent;
  let fixture: ComponentFixture<StarshipTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarshipTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
