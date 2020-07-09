import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesTabsComponent } from './species-tabs.component';

describe('SpeciesTabsComponent', () => {
  let component: SpeciesTabsComponent;
  let fixture: ComponentFixture<SpeciesTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
