import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedItemsComponent } from './rented-items.component';

describe('RentedItemsComponent', () => {
  let component: RentedItemsComponent;
  let fixture: ComponentFixture<RentedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
