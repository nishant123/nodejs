import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppModule } from 'src/app/app.module';
import { LoginModule } from '../login/login.module';

import { ForgotConfirmationComponent } from './forgot-confirmation.component';

describe('ForgotConfirmationComponent', () => {
  let component: ForgotConfirmationComponent;
  let fixture: ComponentFixture<ForgotConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotConfirmationComponent],
      imports: [
        AppModule,
        LoginModule,
        ModalModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
