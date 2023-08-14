import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppModule } from 'src/app/app.module';
import { SignupModule } from '../signup/signup.module';

import { SignupConfirmationComponent } from './signup-confirmation.component';

describe('SignupConfirmationComponent', () => {
  let component: SignupConfirmationComponent;
  let fixture: ComponentFixture<SignupConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        SignupModule,
        ModalModule.forRoot(),
      ],
      declarations: [ SignupConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
