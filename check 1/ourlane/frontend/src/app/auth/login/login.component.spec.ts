import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from 'src/app/app.module';
import { LoginComponent } from './login.component';
import { AuthServices } from '../../_services/auth.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginModule } from './login.module';
import { DOMHelper } from './../../_config/dom-helper-testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let domHelper: DOMHelper<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule,
        LoginModule
      ],
      providers: [AuthServices, TranslateService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should be login and login button  on the page', () => {
    expect(domHelper.countText('h3', 'loginPage.title')).toBe(1);
    expect(domHelper.countText('p', 'loginPage.subTitle')).toBe(1);
    expect(domHelper.countText('label', 'label.email')).toBe(1);
    expect(domHelper.countText('label', 'label.password')).toBe(1);
    expect(domHelper.countText('label', 'label.rememberMe')).toBe(1);
    expect(domHelper.clickButton('button.login')).toBe();
  });
  it('form invalid when empty [login form]', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('form field checking [login form]', () => {
    const email = component.loginForm.controls.email;
    const password = component.loginForm.controls.password;
    const rememberMe = component.loginForm.controls.rememberMe;
    expect(email.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();
    expect(rememberMe.valid).toBeTruthy();

    let errors = {};
    errors = email.errors || {};
    expect(errors.required).toBeTruthy();
    errors = password.errors || {};
    expect(errors.required).toBeTruthy();
    errors = rememberMe.errors || {};
    expect(errors.required).toBeFalsy();

    email.setValue('');
    password.setValue('12345678');
    rememberMe.setValue(true);
    expect(component.loginForm.valid).toBeTruthy();
  });

});
