import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dennis1Component } from './dennis1-component';

describe('Dennis1Component', () => {
  let component: Dennis1Component;
  let fixture: ComponentFixture<Dennis1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dennis1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dennis1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
