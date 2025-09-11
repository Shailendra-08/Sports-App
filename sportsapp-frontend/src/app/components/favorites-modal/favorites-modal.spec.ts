import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesModal } from './favorites-modal';

describe('FavoritesModal', () => {
  let component: FavoritesModal;
  let fixture: ComponentFixture<FavoritesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
