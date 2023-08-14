import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ourlane';

  public showNavHeader = false;

  constructor(
    public translate: TranslateService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.routeCheck();
  }

  routeCheck() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((navEnd: NavigationEnd) => {
        if (
          navEnd.urlAfterRedirects.includes('/webadmin') ||
          navEnd.urlAfterRedirects.includes('/signup') ||
          navEnd.urlAfterRedirects.includes('/privacy-policy') ||
          navEnd.urlAfterRedirects.includes('/terms-conditions') ||
          navEnd.urlAfterRedirects.includes('/reset-password') ||
          navEnd.urlAfterRedirects.includes('/verifyEmail')
        ) {
          this.showNavHeader = false;
        } else {
          this.showNavHeader = true;
        }
      });
  }
}
