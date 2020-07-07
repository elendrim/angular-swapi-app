import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePropertyComponent } from './people-property.component';

describe('PeoplePropertyComponent', () => {
  let component: PeoplePropertyComponent;
  let fixture: ComponentFixture<PeoplePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
