import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTabsComponent } from './vehicle-tabs.component';

describe('VehicleTabsComponent', () => {
  let component: VehicleTabsComponent;
  let fixture: ComponentFixture<VehicleTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
