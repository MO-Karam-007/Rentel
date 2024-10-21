import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsCardComponent } from './rentals-card.component';

describe('RentalsCardComponent', () => {
  let component: RentalsCardComponent;
  let fixture: ComponentFixture<RentalsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
