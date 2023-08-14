import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServices } from '../../_services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOMHelper } from './../../_config/dom-helper-testing';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let domHelper: DOMHelper<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        AppModule,
        HomeModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [ AuthServices, TranslateService],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form invalid when empty [reset Password]', () => {
    expect(component.resetPassword.valid).toBeFalsy();
  });
  it('form field checking [reset Password]', () => {
    const currentPassword = component.resetPassword.controls.currentPassword;
    const password = component.resetPassword.controls.password;
    const cpassword = component.resetPassword.controls.cpassword;

    expect(currentPassword.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();
    expect(cpassword.valid).toBeFalsy();

    let errors = {};
    errors = currentPassword.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();
    errors = password.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();
    errors = cpassword.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

    currentPassword.setValue('1234589');
    password.setValue('12345678');
    cpassword.setValue('12345678');
    expect(component.resetPassword.valid).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
