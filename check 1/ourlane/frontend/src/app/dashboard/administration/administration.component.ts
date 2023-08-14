import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AuthServices } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { configImage } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from '../../_services/excel.service';
import { S3Service } from 'src/app/_services/s3.service';
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  searchIcon = configImage.searchIcon;
  viewIcon = configImage.viewIcon;
  deleteIcon = configImage.deleteIcon;
  approveIcon = configImage.approveIcon;
  declineIcon = configImage.declineIcon;
  trash = configImage.trash;
  checkCircle = configImage.checkCircle;
  closeIcon = configImage.closeIcon;
  deletepopupIcon = configImage.deletepopupIcon;
  public downloadCSV = configImage.downloadCSV;
  public activeTab = 'admin';

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('successPopupAdmin') successPopupAdmin: TemplateRef<any>;
  @ViewChild('successPopupConcierge') successPopupConcierge: TemplateRef<any>;
  @ViewChild('deletePopupAdmin') deletePopupAdmin: TemplateRef<any>;
  @ViewChild('deletePopupConcierge') deletePopupConcierge: TemplateRef<any>;
  @ViewChild('deleteAdmin') deleteAdmin: TemplateRef<any>;
  @ViewChild('deleteConciergeAdmin') deleteConciergeAdmin: TemplateRef<any>;
  @ViewChild('deleteAllPopup') deleteAllPopup: TemplateRef<any>;  
  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public SelectionType = SelectionType;
  public adminList: any = [];
  public adminExcel: any = [];
  public listStatus = [
    { value: 'allType', label: 'All types' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'ADMIN', label: 'Admin' }
  ];
  searchByName = '';
  page = 1;
  totalAdmins = 0;
  inActiveAdminsCount = 0;
  requestedAdminsCount = 0;
  public perPage = 10;
  public pageNumber = 1;
  filterObj: any = {
  };
  public searchText = '';
  public ColumnMode = ColumnMode;
  public roleType: any = {};
  getAllAdminData: any;
  openData: any;
  uuid: string;
  accountStatus = 'isActive';
  reqButton = 'btn';
  InactiveButton = 'btn';
  adminButton = 'btn active';
  isAdminTab = true;
  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthServices, private router: Router, private translate: TranslateService, private excelService: ExcelService,
    private modalService: BsModalService, public toastrService: ToastrService, private s3Service: S3Service, private modal: NgbModal) {
    this.onResize();
    // tslint:disable-next-line: no-string-literal
    this.roleType = this.listStatus[1]['value'];
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 991) {
      this.datatableResponsive = true;
    } else {
      this.datatableResponsive = true;
    }
  }

  ngOnInit(): void {
    this.changeContent('admin');
  }
  onActivate(event) {
  }
  public selectedData
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);  
    const item = selected.filter(data => data.role == 'CONCIERGE').map(res => res.uuid);   
    this.selectedData = item.join();
  }
  multiDelete(deleteAll) {
    this.modal.open(deleteAll, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'delete-modal',
      centered: true
    });
  }
  deleteAllConciere(){   
    const deleteConciereUaer  = {
      "deleteUser": this.selectedData.split(',')
    }
    this.authService.multideleteAdmin(deleteConciereUaer).subscribe((response) => {
      if (response.code === 200) {
        this.modalRef = this.modalService.show(this.deleteAllPopup, { class: 'custom-success-car-modal modal-dialog-centered' });
       
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.modal.dismissAll();
        this.getAdminList(this.filterObj);
      }
    });
  }
  
  openModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal small-modal' }));
  }
  deleteModal(template: TemplateRef<any>, data) {
    this.uuid = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'alert-modal modal-412' }));
  }
  deleteConciergeModal(template: TemplateRef<any>, data) {
    this.uuid = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'alert-modal modal-412' }));
  }
  confirm(): void {
    const obj = {
      uuid: this.uuid
    };
    this.authService.deleteAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {
       
          this.modal.dismissAll();
          this.modalRef = this.modalService.show(this.deleteAdmin, { class: 'custom-success-car-modal modal-dialog-centered' });
          setTimeout(() => {
            this.modalService.hide();
          }, 3000);
        this.filterObj.pageNumber = this.pageNumber;
        this.filterObj.perPage = this.perPage;
        this.getAdminList(this.filterObj);
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
    this.modalRef.hide();
  }
  
  confirmConcierge(): void {
    const obj = {
      uuid: this.uuid
    };
    this.authService.deleteAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {
     
          this.modal.dismissAll();
          this.modalRef = this.modalService.show(this.deleteConciergeAdmin, { class: 'custom-success-car-modal modal-dialog-centered' });
          setTimeout(() => {
            this.modalService.hide();
          }, 3000);
        this.filterObj.pageNumber = this.pageNumber;
        this.filterObj.perPage = this.perPage;
        this.getAdminList(this.filterObj);
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
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  checkRole() {
    this.adminButton = 'btn active';
    this.InactiveButton = 'btn',
      this.reqButton = 'btn';
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.accountStatus = 'isActive',
      this.getAdminList(this.filterObj);
  }

  inActiveAdmins() {
    this.InactiveButton = 'btn active';
    this.reqButton = 'btn';
    this.adminButton = 'btn';
    this.isAdminTab = false;
    this.roleType = '';
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = this.pageNumber;
    this.accountStatus = 'isDeleted',
      this.getAdminList(this.filterObj);
  }
  requestedAdmins() {
    this.reqButton = 'btn active';
    this.InactiveButton = 'btn';
    this.adminButton = 'btn';
    this.isAdminTab = false;
    this.roleType = '';
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = this.pageNumber;
    this.accountStatus = 'isRequstedUser',
      this.getAdminList(this.filterObj);
  }
  getAllAdmin() {
    this.adminButton = 'btn active';
    this.InactiveButton = 'btn',
      this.reqButton = 'btn',
      this.isAdminTab = true;
    this.roleType = this.listStatus[0].value;
    this.accountStatus = 'isActive',
      this.getAdminList(this.filterObj);
  }

  approveRejectModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal small-modal' }));
  }


  approveUser(): void {
    const obj = {
      uuid: this.openData.uuid
    };
    this.authService.approveAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {       
          this.modal.dismissAll();
          this.modalRef = this.modalService.show(this.successPopupAdmin, { class: 'custom-success-car-modal modal-dialog-centered' });
          setTimeout(() => {
            this.modalService.hide();
          }, 3000);
        this.requestedAdmins();
      }
    }, error => {
      this.toastrService.error(error.error.message,
        '');
    });
    this.modalRef.hide();
  }
  approveUserConcierge(): void {
    const obj = {
      uuid: this.openData.uuid
    };
    this.authService.approveAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {
      
          this.modal.dismissAll();
          this.modalRef = this.modalService.show(this.successPopupConcierge, { class: 'custom-success-car-modal modal-dialog-centered' });
          setTimeout(() => {
            this.modalService.hide();
          }, 3000);
        this.requestedAdmins();
      }
    }, error => {
      this.toastrService.error(error.error.message,
        '');
    });
    this.modalRef.hide();
  }
  
  declineUser(): void {
    const obj = {
      uuid: this.openData.uuid
    };
    this.authService.declineAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {
       
        this.modal.dismissAll();
        this.modalRef = this.modalService.show(this.deletePopupAdmin, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.requestedAdmins();
      }
    }, error => {
      this.toastrService.error(error.error.message,
        '');
    });
    this.modalRef.hide();
  }
  
  declineUserConcierge(): void {
    const obj = {
      uuid: this.openData.uuid
    };
    this.authService.declineAdmin(obj).subscribe((response) => {
      // tslint:disable-next-line: triple-equals
      if (response && response.code == 200) {
       
        this.modal.dismissAll();
        this.modalRef = this.modalService.show(this.deletePopupConcierge, { class: 'custom-success-car-modal modal-dialog-centered' });
        setTimeout(() => {
          this.modalService.hide();
        }, 3000);
        this.requestedAdmins();
      }
    }, error => {
      this.toastrService.error(error.error.message,
        '');
    });
    this.modalRef.hide();
  }
  onSearch(text) {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.searchByName = text;
    this.getAdminList(this.filterObj);
  }
  getAdminList(filterObj?) {
    filterObj.searchByName = this.searchByName;
    filterObj.accountStatus = this.accountStatus;    
    switch (this.roleType) {
      case 'SUPER_ADMIN': {       
        break;
      }
      case 'ADMIN': {
       
        break;
      }
      default: {
        filterObj.accountStatus = this.accountStatus;       
        break;
      }
    }
  
    this.getAllAdminData = this.authService.getAdminList(filterObj).subscribe((response) => {
      if (response.code === 200) {
        response.result.rows.map(ele => {
          if (ele.profileImage) {
            ele.profileImage = this.s3Service.getSignedUrl(ele.profileImage);
          }
        });
        this.adminList = response.result.rows;
       
        this.totalAdmins = response.result.count;
        this.inActiveAdminsCount = response.result.inActiveuser;
        this.requestedAdminsCount = response.result.requestedUser;
        this.page = filterObj.pageNumber;
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
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.getAllAdminData.unsubscribe();
  }

  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this._changePage();
  }

  private _changePage() {
    this.getAdminList(this.filterObj);
  }
  public onPageNumber(page) {
    if (
      !isNaN(parseInt(page.target.value, 10)) &&
      parseInt(page.target.value, 10) !== 0
    ) {
      if (parseInt(page.target.value, 10) <= this.totalAdmins) {
        this.loadPage(parseInt(page.target.value, 10));
        this.pageNumber = page.target.value;
      }
      else {
        this.toastrService.error(this.translate.instant('errors.noDataFound'),
          '');
      }
    }
  }
  // public onPageNumber(page) {
  //   // tslint:disable-next-line: radix
  //   if (!isNaN(parseInt(page.target.value)) && parseInt(page.target.value) !== 0) {
  //     // tslint:disable-next-line: radix
  //     // this.loadPage(parseInt(page.target.value));
  //     // this.page = page.target.value;
  //     alert('hello');
  //   } else {
  //     this.loadPage(this.pageNumber);
  //   }
  // }

  public exportAsXLSX(): void {
    this.filterObj.pageNumber = 1;
    this.filterObj.perPage = this.totalAdmins;
    this.searchByName = '';
    this.getAdminListExcel(this.filterObj);
  }

  public getAdminListExcel(filterObj) {
    this.getAllAdminData = this.authService.getAdminList(filterObj).subscribe((response) => {
      if (response.code === 200) {
        const adminList = response.result.rows;
        this.adminExcel = adminList.map((obj) => {
          return {
            'Full Name': obj.fullName,
            'Login Id': obj.loginId,
            'Mobile Number': obj.mobileNumber
          };
        });
        this.excelService.exportAsExcelFile(this.adminExcel, 'Administration');
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
  public changeContent(activeTabVal: string) {
    this.activeTab = activeTabVal;
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;

    if (this.activeTab === 'admin') {
      this.filterObj.roles = ['ADMIN', 'SUPER_ADMIN'];
      this.getAdminList(this.filterObj);
    }
    if (this.activeTab === 'concierge') {

      this.filterObj.roles = ['CONCIERGE'];
      this.getAdminList(this.filterObj);
    }
  }
}
