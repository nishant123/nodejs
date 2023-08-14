import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { configImage } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public logo = configImage.logo;
  public backIcon = configImage.backIcon;
  public keyIcon = configImage.keyIcon;
  public eyeIcon = configImage.eyeIcon;
  public eyeActiveIcon = configImage.eyeActiveIcon;
  public signupImage = configImage.signupImage;

  public resetPassword: FormGroup;
  public fieldTextType: boolean;
  public fieldTextTypeConfirm: boolean;
  public submit = false;
  public userEmail: any = '';
  public password: any = '';
  public cpassword: any = '';
  public passworderror = false;
  public emailExistErr: string;
  public emailExists = false;
  public smModal: any;
  email: string;
  verificationCode: string;
  numberExists = false;
  LetterExists = false;
  capitalLetterExists = false;
  specialCharExists = false;
  lengthCheck = false;
  invalidPassword = false;
  public statusNumber = 0;
  public showPS = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServices,
    public toastrService: ToastrService,
    public translate: TranslateService
  ) { }

  public ONCHANGE(e) {
    const re = /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/;
    if (re.test(e.target.value)) {
      e.preventDefault();
    }
  }

  ngOnInit(): void {
    this.verificationCode = this.route.snapshot.paramMap.get('verificationCode');
    this.email = this.route.snapshot.paramMap.get('email');

    this.resetPassword = this.formBuilder.group({
      password: [null,
        [Validators.compose([Validators.minLength(8), Validators.maxLength(15)])]
      ],
      cpassword: ['', Validators.required],
    });
  }
  public signup(params) {
    const obj = {
      email: this.email,
      verificationCode: this.verificationCode,
      password: params.password
    };
    this.authService.setPassword(obj).subscribe((respopnse) => {
      if (respopnse.code === 200) {
        setTimeout(() => {
          this.toastrService.success(
            'Password updated successfully',
            '');
        }, 1000);
        this.router.navigate(['/webadmin']);
      }
    }, error => {
      if (error.error.code === 400 && error.error.message === 'Invalid verification code') {
        setTimeout(() => {
          this.toastrService.error('Email verification link already used!',
            '');
        }, 3000);
        this.router.navigate(['/webadmin']);

      }
      else {
        if (!error.error.message) {
          this.toastrService.error(this.translate.instant('errors.connectionError'),
            '');
        } else {
          this.toastrService.error(error.error.message,
            '');
        }
      }
    });
  }
  passwordCheck(password: string) {
    this.numberExists = false;
    this.LetterExists = false;
    this.capitalLetterExists = false;
    this.lengthCheck = false;
    this.specialCharExists = false;
    this.invalidPassword = false;
    if (password.length < 8 || password.length > 15) {
      this.numberExists = false;
      this.LetterExists = false;
      this.capitalLetterExists = false;
      this.lengthCheck = false;
      this.specialCharExists = false;
      this.invalidPassword = false;
      this.statusNumber = 0;
      this.showPS = false;
      return false;
    }

    if (password.length > 8 || password.length <= 15) {
      let num = 0;
      let num1 = 0;
      let num2 = 0;
      let num3 = 0;
      if (password.match(/[0-9]/g)) {
        num = 1;
      }
      if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        num1 = 1;
      }
      if (password.match(/[a-z]/)) {
        num2 = 1;
      }
      if (password.match(/[A-Z]/)) {
        num3 = 1;
      }
      this.statusNumber = (num + num1 + num2 + num3);
      this.showPS = true;
    }
    if (!password.match(/[0-9]/g)) {
      this.numberExists = true;
      return false;
    }

    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      this.specialCharExists = true;
      return false;
    }

    if (!password.match(/[a-z]/)) {
      this.LetterExists = true;
      return false;
    }

    if (!password.match(/[A-Z]/)) {
      this.capitalLetterExists = true;
      return false;
    }
    if (this.numberExists && this.LetterExists && this.capitalLetterExists
      && this.specialCharExists) {
      this.invalidPassword = false;
    } else {
      this.invalidPassword = true;
    }

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }
}
