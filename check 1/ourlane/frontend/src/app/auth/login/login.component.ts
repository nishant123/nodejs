import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServices } from '../../_services/auth.service';
import { routerLinks } from '../../../app/_config/router-links';


import {
  BsModalService
} from 'ngx-bootstrap/modal';

import {
  BsModalRef
} from 'ngx-bootstrap/modal';

import {
  ForgotConfirmationComponent
} from '../forgot-confirmation/forgot-confirmation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  public routeAnalytics = routerLinks.analytics.analyticsHome;
  public message: string;
  public loginForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  // tslint:disable-next-line: no-inferrable-types
  public submit: boolean = false;
  public rememberMe: boolean;
  public userEmail: any = '';
  public password: any = '';
  public fieldTextType: boolean;
  public loginSuccess = false;

  public passwordNotExit = false;
  public emailFromJoin: any;
  public userEmailValue: string;
  public emailNotExist = false;
  public emailExistErr: string;
  public emailExists = false;
  public emailNotVerify = false;
  public wrongPwdAttempts = false;
  public errorResponse: string;
  public errorResponsePassword: string;
  checkvalue = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public route: ActivatedRoute,
    private authService: AuthServices,
    private modalService: BsModalService,

  ) { }

  public ONCHANGE(e) {
    // tslint:disable-next-line: prefer-const
    let re = /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/;
    if (re.test(e.target.value)) {
      e.preventDefault();
    }
  }
  emailChanges() {
    this.emailExistErr = '';
    this.emailExists = false;
    this.errorResponse = '';
  }
  ngOnInit() {

    const token = localStorage.getItem('access_token');
    if (token && JSON.parse(localStorage.getItem('remeberMe'))) {
      this.router.navigate([this.routeAnalytics]);
    } else {
      localStorage.clear();
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')
      ]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')
      ]],
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public login(params) {
    const queryParams = {
      email: params.email,
      password: params.password
    };
    params.rememberMe ? this.checkvalue = true : this.checkvalue = false;
    this.authService.login(queryParams).subscribe((response) => {
      if (response.code === 200) {
        localStorage.setItem('access_token', response.result.token);
        localStorage.setItem('uuid', response.result.userDetails.id);
        localStorage.setItem('role', response.result.userDetails.role);
        localStorage.setItem('remeberMe', JSON.stringify(this.checkvalue));
        this.router.navigate([this.routeAnalytics]);
      }
    }, error => {
      if (error.error.code === 400 && error.error.responseCode === 'EMAIL_NOT_VERIFIED') {
        this.errorResponse = error.error.message;
      }
      else if (error.error.code === 400 && error.error.responseCode === 'INVALID_LOGIN_ID') {
        // this.errorResponse = error.error.message;
        this.errorResponse = 'This email ID is not registered in our platform';
      }
      else if (error.error.code === 400 && error.error.responseCode === 'INVALID_PASSWORD') {
        this.errorResponsePassword = error.error.message;
      }
      else if (error.error.code === 400 && error.error.responseCode === 'USER_INACTIVE') {
        this.errorResponsePassword = error.error.message;
      }
    });
  }

  public forgotPassword(params) {
    this.authService.forgetPassword(params).subscribe((respopnse) => {
      // tslint:disable-next-line: no-string-literal
      if (respopnse['code'] === 200) {
        // this.snackBar.open('Link sent your Email', ' ', {
        //   duration: 3000
        // });
        this.modalRef = this.modalService.show(ForgotConfirmationComponent, {
          class: 'small-modal',
          initialState: {
            message: params.email
          }

        });

        this.router.navigate(['/signup']);
        // console.log(this.message);
      }

    }, error => {
      // this.snackBar.open(error.error.message, ' ', {
      //   duration: 3000
      // });
      if (error.error.code === 400 && error.error.responseCode === 'INVALID_LOGIN_ID') {
        // this.errorResponse = error.error.message;
        this.errorResponse = 'This email ID is not registered in our platform';
      }
      else if (error.error.code === 400 && error.error.responseCode === 'INVALID_PASSWORD') {
        this.errorResponsePassword = error.error.message;
      }
    });
  }

}
