import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMainComponent } from './message-main.component';

describe('MessageMainComponent', () => {
  let component: MessageMainComponent;
  let fixture: ComponentFixture<MessageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
