import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Farme2Component } from './farme2.component';

describe('Farme2Component', () => {
  let component: Farme2Component;
  let fixture: ComponentFixture<Farme2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Farme2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Farme2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
