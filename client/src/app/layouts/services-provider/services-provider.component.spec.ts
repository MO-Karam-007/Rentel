import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesProviderComponent } from './services-provider.component';

describe('ServicesProviderComponent', () => {
  let component: ServicesProviderComponent;
  let fixture: ComponentFixture<ServicesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
