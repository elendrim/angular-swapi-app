import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesPropertyComponent } from './species-property.component';

describe('SpeciesPropertyComponent', () => {
  let component: SpeciesPropertyComponent;
  let fixture: ComponentFixture<SpeciesPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
