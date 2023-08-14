import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { configImage } from '../../_config/config';
import { AuthServices } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild('deletePopup') deletePopup: TemplateRef<any>;
  checkCircle = configImage.checkCircle
  public subscription: Subscription;
  public modalRef: BsModalRef;
  public carAddIcon = configImage.carAddIcon;
  public carRemoveIcon = configImage.carRemoveIcon;
  public successIcon = configImage.successIcon;
  public userAddIcon = configImage.userAddIcon;
  public userRemoveIcon = configImage.userRemoveIcon;
  public deletepopupIcon = configImage.deletepopupIcon;
  public notficationList: any;
  public notfication: any;
  public notficationChecked: any;
  public notificationSelected: 0;
  public isRead: 0;
  public newNotification: any;
  public notificationSelectedData: any;
  public page = 1;
  public totalNotifications = 0;
  public perPage = 10;
  public pageNumber = 1;
  filterObj: any = {
  };
  type: 'notification';
  getAllNotificationData: any;


  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthServices, private modalService: BsModalService, public toastrService: ToastrService, private translate: TranslateService) {
  }
  ngOnInit(): void {
    this.getNotfictionList({
      perPage: this.perPage,
      pageNumber: this.pageNumber,
      type: 'notification'
    });

  }

  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this.filterObj.type = 'notification';

    this.getNotfictionList(this.filterObj);

  }
  public onPageNumber(page) {
    // tslint:disable-next-line: radix
    if (!isNaN(parseInt(page.target.value)) && parseInt(page.target.value) !== 0) {
      // tslint:disable-next-line: radix
      this.loadPage(parseInt(page.target.value));
      // this.page = page.target.value;
    } else {
      this.loadPage(this.pageNumber);
    }
  }
  getNotfictionList(filterObj?) {
    // tslint:disable-next-line: deprecation
    this.getAllNotificationData = this.authService.getNotfictionLists(filterObj).subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      this.totalNotifications = response['result'].count;
      this.notficationList = response.result.rows;
      this.page = filterObj.pageNumber;
    }, error => {
      setTimeout(() => {
        if (!error.error.message) {
          this.toastrService.error(this.translate.instant('errors.connectionError'),
            '');
        }
      }, 1000);
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.getAllNotificationData.unsubscribe();
  }


  checkboxClicked() {
    this.notficationList.filter(x => x.checked).map(x => {
      this.notficationChecked = x.uuid;
    });
    this.notificationSelected = this.notficationList.filter((x: { checked: any; }) => x.checked).length;
  }

  CheckAllOptions() {
    // tslint:disable-next-line: triple-equals
    if (this.notficationList.every(x => x.checked == true)) {
      this.notficationList.forEach(x => { x.checked = false; });
    }
    else {
      this.notficationList.forEach(x => { x.checked = true; });
    }
    this.notficationList.filter(x => x.checked).map(x => {
      this.notficationChecked = x.uuid;
    });
    this.notificationSelected = this.notficationList.filter(x => x.checked).length;
  }

  markAsRead() {
    const readData = [];
    this.notficationList.filter(x => x).map(x => {
      readData.push(x.uuid);
      this.authService.readNotification({ uuid: readData }).subscribe((response) => {
        this.loadPage(this.page);
      });
    });
  }
  read(notfication) {
    const readData = [];
    readData.push(notfication.uuid);
    // tslint:disable-next-line: deprecation
    this.authService.readNotification({ uuid: readData }).subscribe((response) => {
      this.loadPage(this.page);
      this.authService.sendNotificationEvent({ uuid: readData });
    });
  }

  deleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'alert-modal' }));
    const dataDetails = [];
    this.notficationList.filter(x => x.checked).map(x => {
      this.notficationChecked = x.uuid;
      dataDetails.push(this.notficationChecked);
      this.notificationSelectedData = dataDetails;
    });
  }
  confirm() {
    this.authService.deleteNotification({ uuid: this.notificationSelectedData }).subscribe((response) => {
      this.loadPage(this.page);
      this.notificationSelected = 0;
      if (response && response.code === 200) {
        this.modalRef = this.modalService.show(this.deletePopup, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
      }
    });
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
}

