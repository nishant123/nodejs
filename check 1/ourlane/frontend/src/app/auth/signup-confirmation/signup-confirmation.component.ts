import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss']
})
export class SignupConfirmationComponent implements OnInit {

  @Input() message: string;
  // tslint:disable-next-line: variable-name
  constructor(
    private modalRef: BsModalRef,
    private authService: AuthServices,
    private router: Router,
    public toastrService: ToastrService,
    public translate: TranslateService
  ) { }

  public ngOnInit(): void {

  }

  decline(): void {
    this.modalRef.hide();
  }
  resendMail() {
    const object = {
      email: this.message
    };
    this.authService.resendVerifyEmail(object).subscribe((respopnse) => {
      // tslint:disable-next-line: no-string-literalrole:"ADMIN"
      // tslint:disable-next-line: no-string-literal
      // console.log(respopnse.result.loginId);
      if (respopnse.code === 200) {
        this.modalRef.hide();
        this.router.navigate(['/webadmin']);
      }
    }, error => {
      setTimeout(() => {
        if (!error.error.message) {
          this.toastrService.error(this.translate.instant('errors.connectionError'),
            '');
        } else {
          this.toastrService.error(error.error.message,
            '');
        }
      }, 1000);
      this.modalRef.hide();
      this.router.navigate(['/webadmin']);
    });
  }
}
