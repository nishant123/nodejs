import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServices } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { configImage } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from '../../_services/excel.service';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(private modalService: BsModalService,
              private authService: AuthServices, private excelService: ExcelService,
              private router: Router, public toastrService: ToastrService, private translate: TranslateService,
              private s3Service: S3Service) {
    this.onResize();
    // tslint:disable-next-line: no-string-literal
  }
  public max = 5;
  public rate;
  public isReadonly = true;
  public searchIcon = configImage.searchIcon;
  public viewIcon = configImage.viewIcon;
  public deleteIcon = configImage.deleteIcon;
  public userDefault = configImage.userDefault;
  public carIcon = configImage.carIcon;
  public downloadCSV = configImage.downloadCSV;

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public SelectionType = SelectionType;
  public customerList: any = [];
  public customerExcel: any = [];
  searchByName = '';
  page = 1;
  totalCustomers = 0;
  public perPage = 10;
  public pageNumber = 1;
  filterObj: any = {
  };
  public searchText = '';
  public ColumnMode = ColumnMode;
  public status: string;
  public openData: any;
  public CustomerRating;
  public payments = [];
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

    this.getCustomerTrips({
      perPage: this.perPage,
      pageNumber: this.pageNumber
    });
  }
  onActivate(event) {
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  checkstatus() {

  }
  onSearch(text) {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.searchByName = text;
    this.getCustomerTrips(this.filterObj);
  }

  getCustomerTrips(filterObj?) {
    filterObj.searchByName = this.searchByName;

    this.authService.getCustomerTrips(filterObj).subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      this.customerList = response['result']['rows'];
      this.customerList.map(ele => {
        if (ele.profileImage) {
          ele.profileImage = this.s3Service.getSignedUrl(ele.profileImage);
        }
      });
      this.totalCustomers = response.result.count;
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
  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this._changePage();
    this.customerList.slice((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage);

  }
  public onPageNumber(page) {
    if (!isNaN(parseInt(page.target.value, 10)) && parseInt(page.target.value, 10) !== 0) {
      this.loadPage(parseInt(page.target.value, 10));
      this.page = page.target.value;

    }
  }

  private _changePage() {
    this.getCustomerTrips(this.filterObj);
  }
  openModal(template: TemplateRef<any>, data) {
    this.payments = [];
    data.cardNo.forEach(element => {
      const item = {
        key: '',
        value: ''
      };
      item.key = Object.keys(element)[0];
      item.value = element[item.key];
      this.payments.push(item);
    });
    this.openData = data;
    if (data.avgCustomerRating == null){
      this.CustomerRating = data.avgCustomerRating;
    }else{
      this.CustomerRating = data.avgCustomerRating.toFixed(4);
    }
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal small-modal' }));
  }
  exportAsXLSX(): void {
    this.filterObj.pageNumber = 1;
    this.filterObj.perPage = this.totalCustomers;
    this.searchByName = '';
    this.getCustomerTripsExcel(this.filterObj);  }
    public getCustomerTripsExcel(filterObj){
    this.authService.getCustomerTrips(filterObj).subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      const customerList = response['result']['rows'];
      this.customerExcel =  customerList.map((obj) => {
        return {
          'Full Name': obj.fullName,
          'Login Id': obj.loginId,
          'Mobile Number': obj.mobileNumber,
          'Date Of Joining': obj.dateOfJoining,
          'Completed Trips': obj.completedTrips,
          'Cancelled Trips': obj.cancelledTrips,
          'Total Rating Given to chauffeurs': obj.totalRatingGivenDrivers,
          Cash: obj.cash
        };
      });
      this.excelService.exportAsExcelFile(this.customerExcel, 'CustomerList');
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

