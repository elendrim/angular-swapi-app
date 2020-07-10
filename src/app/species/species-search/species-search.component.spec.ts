import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesSearchComponent } from './species-search.component';

describe('SpeciesSearchComponent', () => {
  let component: SpeciesSearchComponent;
  let fixture: ComponentFixture<SpeciesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
