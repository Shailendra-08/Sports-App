import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DennisComponent } from './dennis-component';

describe('DennisComponent', () => {
  let component: DennisComponent;
  let fixture: ComponentFixture<DennisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DennisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
