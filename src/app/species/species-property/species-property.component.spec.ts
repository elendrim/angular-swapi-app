import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from '../../angular-material.module';

import { SpeciesPropertyComponent } from './species-property.component';

describe('SpeciesPropertyComponent', () => {
  let component: SpeciesPropertyComponent;
  let fixture: ComponentFixture<SpeciesPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ SpeciesPropertyComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { parent: { paramMap: of(convertToParamMap({})) } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesPropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
