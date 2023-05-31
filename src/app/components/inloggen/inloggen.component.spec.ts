import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InloggenComponent } from './inloggen.component';

describe('InloggenComponent', () => {
  let component: InloggenComponent;
  let fixture: ComponentFixture<InloggenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InloggenComponent]
    });
    fixture = TestBed.createComponent(InloggenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
