import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthServices
} from '../../_services/auth.service';

import {
  BsModalService
} from 'ngx-bootstrap/modal';

import {
  BsModalRef
} from 'ngx-bootstrap/modal';

import {
  SignupConfirmationComponent
} from '../signup-confirmation/signup-confirmation.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
}

) export class SignupComponent implements OnInit {
  modalRef: BsModalRef;
  public signupForm: FormGroup;
  // tslint:disable-next-line: no-inferrable-types
  public message: string;
  public fieldTextType: boolean;
  public fieldTextTypeConfirm: boolean;
  public submit = false;
  public userEmail: any = '';
  public password: any = '';
  public cpassword: any = '';
  // tslint:disable-next-line: no-inferrable-types
  public passworderror = false;
  public emailExistErr: string;
  public emailExists = false;
  public smModal: any;
  numberExists = false;
  LetterExists = false;
  capitalLetterExists = false;
  specialCharExists = false;
  lengthCheck = false;
  invalidPassword = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServices,
    private modalService: BsModalService,
  ) { }

  public ONCHANGE(e) {
    // tslint:disable-next-line: prefer-const
    let re = /[`~ !#$%^&*()_|+\-=?;: '",<>\{\}\[\]\\\/]/;
    if (re.test(e.target.value)) {
      e.preventDefault();
    }
  }
  emailChanges() {
    this.emailExistErr = '';
    this.emailExists = false;
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required,
      Validators.email,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      password: [null,
        [Validators.required, Validators.compose([Validators.minLength(8), Validators.maxLength(15)])]],
      cpassword: ['', Validators.required],
    }

    );
  }
  passwordCheck(password: string) {
    this.numberExists = false;
    this.LetterExists = false;
    this.capitalLetterExists = false;
    this.lengthCheck = false;
    this.specialCharExists = false;
    if (password.length < 8 || password.length > 15) {
      this.numberExists = false;
      this.LetterExists = false;
      this.capitalLetterExists = false;
      this.lengthCheck = false;
      this.specialCharExists = false;
      return false;
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

  public signup(params) {
    const queryParams = {
      email: params.email,
      password: params.password,
      confirmPassword: params.cpassword,
      // tslint:disable-next-line: quotemark
      role: "ADMIN",
      organizationId: ''
    }

      ;

    this.authService.register(queryParams).subscribe((respopnse) => {
      // tslint:disable-next-line: no-string-literalrole:"ADMIN"
      // tslint:disable-next-line: no-string-literal
      if (respopnse['code'] === 200) {
        this.modalRef = this.modalService.show(SignupConfirmationComponent, {
          class: 'small-modal',
          initialState: {
            message: respopnse.result.loginId
          }
        });
        // return this.modalRef.content.onClose;

        setTimeout(() => {
          this.router.navigate(['/webadmin']);
        }
          , 1000);
      }
    }
      , error => {
        if (error.error.code === 400) {
          this.emailExists = true;
          this.emailExistErr = 'Email already exist`s.';
        }
      }

    );
    this.submit = true;
  }
}
