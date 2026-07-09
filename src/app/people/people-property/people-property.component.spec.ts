import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from '../../angular-material.module';

import { PeoplePropertyComponent } from './people-property.component';

describe('PeoplePropertyComponent', () => {
  let component: PeoplePropertyComponent;
  let fixture: ComponentFixture<PeoplePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ PeoplePropertyComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { parent: { paramMap: of(convertToParamMap({})) } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
