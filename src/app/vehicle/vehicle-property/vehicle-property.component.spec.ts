import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePropertyComponent } from './vehicle-property.component';

describe('VehiclePropertyComponent', () => {
  let component: VehiclePropertyComponent;
  let fixture: ComponentFixture<VehiclePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
