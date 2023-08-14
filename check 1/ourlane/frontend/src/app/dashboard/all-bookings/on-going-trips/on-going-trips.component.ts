import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { routerLinks } from '../../../_config/router-links';
import { AllBookingServices } from '../../../_services/all-booking.service';
import { ExcelService } from '../../../_services/excel.service';
import { configImage, listOngoingStatus, config } from 'src/app/_config/config';

import { S3Service } from 'src/app/_services/s3.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-on-going-trips',
  templateUrl: './on-going-trips.component.html',
  styleUrls: ['./on-going-trips.component.scss']
})
export class OnGoingTripsComponent implements OnInit {
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('successPopup') successPopup: TemplateRef<any>;
  public downloadCSV = configImage.downloadCSV;
  public viewDetailsIcon = './assets/images/icon-eye.svg';
  public images = configImage;
  public searchIcon = './assets/images/icon-search.svg';
  public routeScheduleCreated = routerLinks.allBookings.ScheduleCreated;
  public routeOnGoing = routerLinks.allBookings.OnGoing;
  public routeCompletedCancel = routerLinks.allBookings.CompletedCancel;
  public headerHeight = 32;
  public footerHeight = 45;
  public limit = 10;
  public width = 30;
  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public SelectionType = SelectionType;
  
  public searchText = '';


  public ColumnMode = ColumnMode;
  public status: string;
  public openData: any;
  public activeTripData = [];
  tripListExcel: any = [];
  public activeTrip: any;
  public tripList: any = [];
  public totalTrip = 0;
  public perPage = 10;
  public pageNumber = 1;
  public filterObj: any = {
  };
  public searchByName: string;
  public selectedTrip: any;
  public listOngoingStatus= listOngoingStatus;
  constructor(
    private allBookingServices: AllBookingServices,
    public modal: NgbModal,
    private excelService: ExcelService,
    private modalService: BsModalService,
    private s3Service: S3Service) {
    this.onResize();   
    this.status = this.listOngoingStatus[0].value;
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
    this.getActiveTrips({
      perPage: this.perPage,
      pageNumber: this.pageNumber,
      tripStatus : this.listOngoingStatus[0].tripStatus,
      tripType : this.listOngoingStatus[0].tripType,
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {

  }
  checkStatus() {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    if(this.status == "All"){
      this.filterObj.tripStatus = "Ongoing";
      this.filterObj.tripType = "All"
    }
    if(this.status == "Right now"){
      this.filterObj.tripStatus = "Ongoing";
      this.filterObj.tripType = "KMBooking"      
    }
    if(this.status == "Hourly Booking"){
      this.filterObj.tripStatus = "Ongoing";
      this.filterObj.tripType = "HourlyBooking"
    }
    this.getActiveTrips(this.filterObj);

  }
  public getActiveTrips(filterObj?) {
    filterObj.searchByName = this.searchByName;     
    this.allBookingServices.getTripList(filterObj).subscribe(response => {
      const tripData = response.result.rows;
      this.activeTripData = tripData.map(m => {
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
      this.activeTripData = [...this.activeTripData];
      this.totalTrip = response.result.count;
      this.pageNumber = filterObj.pageNumber;
    });
  }

  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this._changePage();

  }

  public onPageNumber(event) {
    // tslint:disable-next-line: radix
    const page = parseInt(event.target.value);
    const availablePage = Math.ceil(this.totalTrip / this.perPage);
    if (page > 0 && page <= availablePage) {
      this.loadPage(page);
    }
  }

  private _changePage() {
    this.getActiveTrips(this.filterObj);
  }
  onSearch(text) {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.searchByName = text;
    this.getActiveTrips(this.filterObj);
  }

  completeTrip() {
    if (this.selectedTrip.bookedHours) {
      const body = {
        uuid: this.selectedTrip.uuid,
        bookedHours: this.selectedTrip.bookedHours,
        driverId: this.selectedTrip.driverId
      };
      this.submitComplete(body);
    } else {
      this.selectedTrip.origin = {
        lat: this.selectedTrip.startLat,
        lng: this.selectedTrip.startLong
      };
      this.selectedTrip.destination = {
        lat: this.selectedTrip.endLat,
        lng: this.selectedTrip.endLong
      };
    }
  }

  calculateDistance(event) {
    if (!this.selectedTrip.submitted) {
      this.selectedTrip.submitted = true;
      const body = {
        uuid: this.selectedTrip.uuid,
        totalKms: 0,
        driverId: this.selectedTrip.driverId
      };
      if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
        const data = event.routes[0].legs[0];
        body.totalKms = +data.distance.text.split(' ')[0];
      }
      this.submitComplete(body);
    }
  }

  submitComplete(body) {
    this.allBookingServices.completeTrip(body).subscribe(res => {
      this.getActiveTrips({
        perPage: this.perPage,
        pageNumber: this.pageNumber
      });
      this.modal.dismissAll();
      this.modalRef = this.modalService.show(this.successPopup, { class: 'custom-success-modal modal-dialog-centered' });
    });
  }

  openModal(template: TemplateRef<any>, data) {
    this.selectedTrip = data;
    this.modal.open(template, {
      centered: true
    });
  }

  exportAsXLSX(): void {
    this.filterObj.pageNumber = 1;
    this.filterObj.perPage = this.totalTrip;
    this.filterObj.tripStatus = 'Ongoing';
    this.searchByName = '';
    this.bookingDetailExcel(this.filterObj);
  }
  public bookingDetailExcel(filterObj) {
    this.allBookingServices.getTripList(filterObj).subscribe(response => {
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
          status: obj.status,
        };
      });
      this.excelService.exportAsExcelFile(this.tripListExcel, 'ActiveTripData');
    });
  }
}
