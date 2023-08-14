import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthServices } from '../../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { routerLinks } from 'src/app/_config/router-links';
import { configImage } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
import { ChatDBServices } from 'src/app/_services/chatdb.service';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, OnDestroy {
  public routeScheduleCreated = routerLinks.allBookings.ScheduleCreated;
  public routeProfile = routerLinks.profile.profileHome;
  public routeAdministration = routerLinks.administration.administrationHome;
  public routeCars = routerLinks.cars.carHome;
  public routeCustomers = routerLinks.customers.customersHome;
  public routeAnalytics = routerLinks.analytics.analyticsHome;

  public logo = configImage.logo;
  public logoIcon = configImage.logoIcon;
  public userDefault = configImage.userDefault;
  public dashboard = configImage.dashboard;
  public administration = configImage.administration;
  public cars = configImage.cars;
  public drivers = configImage.drivers;
  public customers = configImage.customers;
  public booking = configImage.booking;
  public newChatCount = 0;
  isSuperAdmin = false;
  role: string = localStorage.getItem('role');
  public userDetails: any = {
    fullName: '',
    role: '',
  };
  public subscription: Subscription;
  public profileImage: any;
  public innerWidth: any;
  public smallScreen = false;
  constructor(private authService: AuthServices,
      public toastrService: ToastrService,
      private translate: TranslateService,
      private chatDbService: ChatDBServices,
      private s3Service: S3Service
      ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth <= 600) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 600) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
    this.checkIsLoggedIn(this.role);
    this.getUserDetails();
    this.getUserData();
    this.chatDbService.getChatListener().subscribe(res => {
      if (this.role === 'SUPER_ADMIN') {
        this.newChatCount = res.length 
      } else {
        const adminUserId = localStorage.getItem('adminUserId');
        res.forEach(f => {
          if (adminUserId == f.assignId) {
            this.newChatCount++;
          }
        })
      }
    })    

  }
  checkIsLoggedIn(role) {
    if (role === 'SUPER_ADMIN') {
      this.isSuperAdmin = true;
    }
  }
  getUserDetails() {
    this.subscription = this.authService.getProfileImageData().subscribe((response) => {
      if (response) {
        this.userDetails = JSON.parse(JSON.stringify(response));
      }
    }, error => {
      if (!error.error.message) {
        this.toastrService.error(this.translate.instant('errors.connectionError'),
          '');
      } else {
        this.toastrService.error(error.error.message,
          '');
      }
    });
  }
  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUserData() {
    this.authService.getUserDetails().subscribe((response) => {
      if (response && response.code === 200) {
        if (response.result.profileImage) {
          response.result.profileImage = this.s3Service.getSignedUrl(response.result.profileImage);
        }
        this.userDetails = response.result;
        this.userDetails.role = (this.userDetails.role === 'ADMIN') ? 'Web Admin' : 'Super Admin';
        if (response.result.profileImage) {
          this.profileImage = response.result.profileImage;
        }
        if (this.userDetails.role === 'ADMIN') {
          localStorage.setItem('adminUserId', response.result.id);
        } else {
          localStorage.setItem('adminUserId', '');
        }
        
        this.chatDbService.getNewTickets();
        this.authService.setProfileImageData(this.userDetails);
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
    });

  }



}
