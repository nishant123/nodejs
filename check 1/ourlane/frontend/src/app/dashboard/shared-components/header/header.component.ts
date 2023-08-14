import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthServices } from '../../../_services/auth.service';
import { configImage } from 'src/app/_config/config';
import { routerLinks } from '../../../_config/router-links';
import { TranslateService } from '@ngx-translate/core';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public notification = routerLinks.notification.notificationHome;
  public profile = routerLinks.profile.profileHome;
  public accountsetting = routerLinks.accountsetting.accountsettingHome;
  modalRef: BsModalRef;
  public userDetails: any;
  public subscription: any;
  public profileImage: any;
  public profileImgname: any;
  public notficationList: any;
  public userDefault = configImage.userDefault;
  public notificationsIcon = configImage.notificationsIcon;
  public settingsIcon = configImage.settingsIcon;
  public logoutImage = configImage.logoutImage;
  public notificationSelected: any;
  public totalNotification: any;
  public totalNewNotification = 0;
  item: any;
  public perPage = 10;
  public pageNumber = 1;
  public type: 'notification';

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private modalService: BsModalService, private authService: AuthServices,
    public translate: TranslateService, private s3Service: S3Service) { }

  ngOnInit(): void {
    this.getUserData();
    this.getNotfictionList({
      perPage: this.perPage,
      pageNumber: this.pageNumber,
      type: this.type
    });

    // tslint:disable-next-line: deprecation
    this.subscription = this.authService.getNotificationEvent().subscribe((response) => {
      this.ngOnInit();
    });

  }
  getNotfictionList(filterObj?) {
    filterObj.perPage = this.perPage;
    filterObj.pageNumber = this.pageNumber;
    filterObj.type = 'notification';

    this.authService.getNotfictionLists(filterObj).subscribe((response) => {
      const dataDetails = [];
      // tslint:disable-next-line: no-string-literal
      this.notficationList = response['result'].rows;
      this.totalNotification = this.notficationList.map(m => {
        if (m.isRead === false) {
          dataDetails.push(m.isRead);
          this.totalNewNotification = dataDetails.length;
        }
      });
    });
  }



  markAsRead() {
    const readData = [];
    this.notficationList.filter(x => x).map(x => {
      readData.push(x.uuid);
      this.authService.readNotification({ uuid: readData }).subscribe((response) => {
        if (response && response.code == 200) {
          this.totalNewNotification = 0;
        }
      })
    });
  }
  notificationPage() {
    this.router.navigate(['/', 'notification']);
    setTimeout(() => {
      this.markAsRead();
    }, 300);

  }

  settings() {
    this.router.navigate(['/', 'accountsetting']);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'alert-modal' })
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/webadmin']);
    this.modalRef.hide();
  }
  getUserData() {
    this.authService.getUserDetails().subscribe((response) => {
      if (response.result.language) {
        const language = response.result.language;
        this.translate.addLangs([language]);
        this.translate.setDefaultLang(language);
        if (localStorage.getItem('locale')) {
          const browserLang = localStorage.getItem('locale');
          this.translate.use(
            browserLang.match(/language/) ? browserLang : language
          );
        } else {
          localStorage.setItem('locale', language);
          this.translate.setDefaultLang(language);
        }
      }
      if (response && response.code === 200) {
        if (response.result.profileImage) {
          response.result.profileImage = this.s3Service.getSignedUrl(response.result.profileImage);
        }
        this.userDetails = response.result;
        this.userDetails.role = (this.userDetails.role === 'ADMIN') ? 'Web Admin' : 'Super Admin';
        if (response.result.profileImage) {
          this.profileImgname = response.result.profileImage;
        }
        // this.navbar.getUserDetails()
        this.authService.setProfileImageData(this.userDetails);
      }
    });
  }
}


