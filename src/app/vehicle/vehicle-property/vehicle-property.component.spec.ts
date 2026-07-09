import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from '../../angular-material.module';

import { VehiclePropertyComponent } from './vehicle-property.component';

describe('VehiclePropertyComponent', () => {
  let component: VehiclePropertyComponent;
  let fixture: ComponentFixture<VehiclePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ VehiclePropertyComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { parent: { paramMap: of(convertToParamMap({})) } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
