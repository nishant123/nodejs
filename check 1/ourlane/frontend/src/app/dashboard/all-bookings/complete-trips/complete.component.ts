import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { routerLinks } from '../../../_config/router-links';
import { AllBookingServices } from '../../../_services/all-booking.service';
import { config, listCompletedStatus, configImage, allBookingsImgs } from '../../../_config/config';
import { ExcelService } from '../../../_services/excel.service';
import { ToastrService } from 'ngx-toastr';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-complete-trips',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('myPanel', { static: false }) myPanel;
  public downloadCSV = configImage.downloadCSV;
  public userDefault = configImage.userDefault;
  public locationIcon = configImage.locationIcon;
  public locationStartIcon = configImage.locationStartIcon;
  public timeBigIcon = configImage.timeBigIcon;
  public locationBigIcon = configImage.locationBigIcon;
  public locationEndIcon = configImage.locationEndIcon;
  public mapLocationStart = configImage.mapLocationStart;
  public markerOptions = {
    origin: {
      icon: this.mapLocationStart,
    },
    destination: {
      icon: this.locationEndIcon,
    }
  };

  public tripDuration: string = undefined;
  public tripDistance: string = undefined;
  // initial center position
  public lat: number = undefined;
  public lng: number = undefined;

  public endLat: number = undefined;
  public endLng: number = undefined;
  public driverlat: number = undefined;
  public driverlng: number = undefined;

  public dirs: object;



  public allBookingsImgs = allBookingsImgs;
  public viewDetailsIcon = './assets/images/icon-eye.svg';
  public routeScheduleCreated = routerLinks.allBookings.ScheduleCreated;
  public routeOnGoing = routerLinks.allBookings.OnGoing;
  public routeCompletedCancel = routerLinks.allBookings.CompletedCancel;
  public max = 5;
  public rateCustomer = '';
  public rateDriver = '';
  public isReadonly = true;
  public headerHeight = config.headerHeight;
  public footerHeight = config.footerHeight;
  public limit = config.limit;
  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public SelectionType = SelectionType;
  public listCompletedStatus = listCompletedStatus;
  public rows: any;
  public ColumnMode = ColumnMode;
  public status: string;
  public openData: any;
  public searchIcon = configImage.searchIcon;
  public btnShecdule = 'btn active';
  public btnOngoing = 'btn';
  public btnCompleteCancel = 'btn';
  public endLocation = configImage.endLocation;
  public startLocation = configImage.startLocation;
  public feedback = configImage.feedback;
  public tripList: any = [];
  public tripListExcel: any = [];
  public totalTrip = 0;
  public perPage = 10;
  public pageNumber = 1;
  public startLocationName = '';
  public endLocationName = '';
  public iconLabels = [];
  filterObj: any = {
  };
  public searchByName: string;
  // google maps zoom
  public zoom = 14;

  constructor(
    private modalService: BsModalService,
    private excelService: ExcelService,
    private allBookingServices: AllBookingServices, public toastrService: ToastrService,
    private s3Service: S3Service
  ) {
    this.onResize();
    this.status = this.listCompletedStatus[0].value;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= config.screenWidth) {
      this.datatableResponsive = true;
    } else {
      this.datatableResponsive = true;
    }
  }

  ngOnInit(): void {
    this.bookingDetail({
      perPage: this.perPage,
      pageNumber: this.pageNumber,
      tripStatus: this.listCompletedStatus[0].tripStatus,
      tripType: this.listCompletedStatus[0].tripType,
    });
  }
  public changeTab(tab: string) {
    tab === 'btnShecdule' ? this.btnShecdule = 'btn active' : this.btnShecdule = 'btn';
    tab === 'btnOngoing' ? this.btnOngoing = 'btn active' : this.btnOngoing = 'btn';
    tab === 'btnCompleteCancel' ? this.btnCompleteCancel = 'btn active' : this.btnCompleteCancel = 'btn';
  }
  checkStatus() {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    if (this.status == "All") {
      this.filterObj.tripStatus = "All";
      this.filterObj.tripType = "All"
    }
    if (this.status == "Completed") {
      this.filterObj.tripStatus = "Completed";
      this.filterObj.tripType = "KMBooking"
    }
    if (this.status == "Cancelled") {
      this.filterObj.tripStatus = "Cancelled";
      this.filterObj.tripType = "KMBooking"
    }
    if (this.status == "Rejected") {
      this.filterObj.tripStatus = "Rejected";
      this.filterObj.tripType = "KMBooking"
    }
    if (this.status == "Hourly Booking") {
      this.filterObj.tripStatus = "All";
      this.filterObj.tripType = "HourlyBooking"
    }
    this.bookingDetail(this.filterObj);

  }
  public bookingDetail(filterObj?) {
    filterObj.searchByName = this.searchByName;
    this.allBookingServices.getTripList(filterObj).subscribe(response => {
      if (response.result) {
        const tripData = response.result.rows;
        this.tripList = tripData.map(m => {
          m.customerName = m.customer_details.fullName;
          m.customerCountryCode = m.customer_details.countryCode;
          m.customerMobile = m.customer_details.mobileNumber;
          m.driverName = m.driver_details.fullName;
          m.driverCountryCode = m.driver_details.countryCode;
          m.dirverMobile = m.driver_details.mobileNumber;
          if (m.driver_details.profileImage) {
            m.driver_details.profileImage = this.s3Service.getSignedUrl(m.driver_details.profileImage);
          }
          if (m.customer_details.profileImage) {
            m.customer_details.profileImage = this.s3Service.getSignedUrl(m.customer_details.profileImage);
          }
          return m;
        });
        if (this.status === 'Completed' && this.tripList.length > 0) {
          this.tripList = this.tripList.filter(item => this.status === 'Completed' && item.status === 'Completed');
          this.totalTrip = response.result.count;

        } else {
          this.totalTrip = response.result.count;
        }
      }
    });
    this.pageNumber = filterObj.pageNumber;
  }
  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this._changePage();

  }

  private _changePage() {
    this.bookingDetail(this.filterObj);
  }

  public onPageNumber(event) {
    // tslint:disable-next-line: radix
    const page = parseInt(event.target.value);
    const availablePage = Math.ceil(this.totalTrip / this.perPage);
    if (page > 0 && page <= availablePage) {
      this.loadPage(page);
    } else {
      // this.toastrService.error('Error');
    }
  }

  onSearch(text) {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.searchByName = text;
    this.bookingDetail(this.filterObj);
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  openModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.rateDriver = data.ratingDriver;
    this.rateCustomer = data.ratingCustomer;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal' }));
  }
  completedTripModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.rateDriver = data.ratingDriver;
    this.rateCustomer = data.ratingCustomer;
    this.startLocationName = data.startLocationName;
    this.endLocationName = data.endLocationName;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal fullModal' }));
    this.dirs = [{
      origin: { lat: this.openData.startLat, lng: this.openData.startLong },
      destination: { lat: this.openData.endLat, lng: this.openData.endLong },
      renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#3FA361', strokeWeight: 8 } },
      onResp: this.onResponse.bind(this)
    }
    ];
  }
  onResponse(event: any) {
    if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
      const data = event.routes[0].legs[0];
      this.iconLabels = [
        {
          lat: data.start_location.lat(),
          lng: data.start_location.lng(),
          type: 'Pickup',
          address: this.startLocationName
        },
        {
          lat: data.end_location.lat(),
          lng: data.end_location.lng(),
          type: 'Drop',
          address: this.endLocationName
        }
      ];
    }
  }
  zoomIn() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom < 22 ? ++this.zoom : null;
  }

  zoomOut() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom > 0 ? --this.zoom : null;
  }

  exportAsXLSX(): void {
    this.filterObj.pageNumber = 1;
    this.filterObj.perPage = this.totalTrip;
    this.searchByName = '';
    this.filterObj.tripStatus = 'Completed';
    this.bookingDetailExcel(this.filterObj);
  }
  public bookingDetailExcel(filterObj) {
    this.allBookingServices.getTripList(filterObj).subscribe(response => {
      if (response.result) {
        const tripDataExcel = response.result.rows;
        this.tripListExcel = tripDataExcel.map((obj) => {
          return {
            'trip Id': obj.tripId,
            'trip Date': obj.tripDate,
            'customer Name': obj.customer_details.fullName,
            'customer Mobile': obj.customer_details.mobileNumber,
            'Chauffeur Name': obj.driver_details.fullName,
            'Chauffeur Mobile': obj.driver_details.mobileNumber,
            'end Location Name': obj.endLocationName,
            'start Location Name': obj.startLocationName,
            'payment Type': obj.paymentType,
            'total Fare': obj.totalFare,
            'total Kms': obj.totalKms,
            'total Time In Minute': obj.totalTimeInMinute,
            'rating Customer': obj.ratingCustomer,
            'rating Chauffeur': obj.ratingDriver,
            'customer Feedback': obj.customerFeedback,
            'Chauffeur Feedback': obj.driverFeedback,
            status: obj.status,
          };
        });
        this.excelService.exportAsExcelFile(this.tripListExcel, 'CompleteTripData');
      }
    });
  }
}

