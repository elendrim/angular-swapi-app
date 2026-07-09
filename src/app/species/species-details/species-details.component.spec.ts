import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from '../../angular-material.module';

import { SpeciesDetailsComponent } from './species-details.component';

describe('SpeciesDetailsComponent', () => {
  let component: SpeciesDetailsComponent;
  let fixture: ComponentFixture<SpeciesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ SpeciesDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the species name in the page', () => {
    component.species.set({ name: 'Human' } as any);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Human');
  });
});
