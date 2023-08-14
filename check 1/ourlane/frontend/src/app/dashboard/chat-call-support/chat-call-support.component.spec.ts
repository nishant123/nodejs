import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { ChatCallSupportComponent } from './chat-call-support.component';
import { ChatCallSupportModule } from './chat-call-support.module';

describe('ChatCallSupportComponent', () => {
  let component: ChatCallSupportComponent;
  let fixture: ComponentFixture<ChatCallSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatCallSupportComponent],
      imports: [
        AppModule,
        ChatCallSupportModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCallSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
