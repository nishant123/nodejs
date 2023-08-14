import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss']
})
export class ActivateEmailComponent implements OnInit {
  email: string;
  verificationCode: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServices,
    public translate: TranslateService,
    public toastrService: ToastrService) { }

  ngOnInit(): void {
    this.verificationCode = this.route.snapshot.paramMap.get('verificationCode');
    this.email = this.route.snapshot.paramMap.get('email');
    this.activateEmail();
  }
  activateEmail() {

    const query = {
      email: this.email,
      verificationCode: this.verificationCode
    };
    this.authService.verifyEmail(query).subscribe((respopnse) => {
      if (respopnse.code === 200) {
        this.router.navigate(['/webadmin']);
        setTimeout(() => {
          this.toastrService.success('Email Verified Successfully! Please Login',
            '');
        }, 1000);
      }
    }, error => {
      if (error.error.code === 400 && error.error.message === 'Invalid verification code') {
        this.router.navigate(['/webadmin']);
        setTimeout(() => {
          this.toastrService.error('Email verification link already used!',
            '');
        }, 1000);
      }
      else if (error.error.code === 400 && error.error.message === 'verification code expired') {
        setTimeout(() => {
          this.toastrService.error('verfication link has been experied!',
            '');
        }, 1000);
        this.router.navigate(['/webadmin']);
      } else {
        setTimeout(() => {
          if (!error.error.message) {
            this.toastrService.error(this.translate.instant('errors.connectionError'),
              '');
          } else {
            this.toastrService.error(error.error.message,
              '');
          }
        }, 1000);
      }
    });
  }
}
