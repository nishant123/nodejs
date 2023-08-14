import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { endpoints } from 'src/app/_config/url-endpoint';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { routerLinks } from '../../_config/router-links';
import { AllBookingServices } from '../../_services/all-booking.service';
import {
  config,
  listScheduledStatus,
  configImage,
  allBookingsImgs,
} from '../../_config/config';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../_services/excel.service';
import { S3Service } from 'src/app/_services/s3.service';
@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent implements OnInit, OnDestroy {
  public downloadCSV = configImage.downloadCSV;
  public tripStatus: string;
  public tripType: string;
  dirs2: { origin: { lat: any; lng: any; }; destination: { lat: any; lng: any; }; renderOptions: { suppressMarkers: boolean; polylineOptions: { strokeColor: string; strokeWeight: number; }; }; onResp: any; }[];
  dirs3: { origin: { lat: any; lng: any; }; destination: { lat: any; lng: any; }; renderOptions: { suppressMarkers: boolean; polylineOptions: { strokeColor: string; strokeWeight: number; }; }; onResp: any; }[];

  constructor(
    private modalService: BsModalService,
    private allBookingServices: AllBookingServices,
    private excelService: ExcelService,
    public toastrService: ToastrService,
    private mqttService: MqttService,
    private s3Service: S3Service
  ) {
    this.onResize();
   
    this.status = this.listScheduledStatus[0].value;
  }
  public userDefault = configImage.userDefault;
  public max = 5;
  public rateCustomer = '';
  public rateDriver = '';
  public isReadonly = true;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('myPanel', { static: false }) myPanel;
  public allBookingsImgs = allBookingsImgs;
  public routeCompletedCancel = routerLinks.allBookings.CompletedCancel;
  public routeOnGoing = routerLinks.allBookings.OnGoing;
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
  public listScheduledStatus = listScheduledStatus;
  public rows: any;
  public ColumnMode = ColumnMode;
  public status: string;
  public openData: any;
  public searchByName: string;
  public searchIcon = configImage.searchIcon;
  public endLocation = configImage.endLocation;
  public startLocation = configImage.startLocation;
  public feedback = configImage.feedback;
  public locationStartIcon = configImage.locationStartIcon;
  public locationEndIcon = configImage.locationEndIcon;
  public mapLocationStart = configImage.mapLocationStart;
  public dynamicDistance: any;
  public dynamicDuration: any;
  tripList: any = [];
  totalTrip = 0;
  public iconLabels = [];
  public dirs = [];
  // google maps zoom
  public zoom = 14;
  public markerOptions = {
    origin: {
      icon: this.mapLocationStart,
    },
    destination: {
      icon: this.locationEndIcon,
    }
  };
  public markerOptions2 = {
    origin: {
      icon: this.locationStartIcon,
    },
    destination: {
      icon: this.mapLocationStart,
    }
  };

  public startLocationName = '';
  public endLocationName = '';
  public subscription;
  public subscriptionCustomer;
  public tripListExcel: any = [];
  public perPage = 10;
  public ExcelperPage = 0;
  public pageNumber = 1;
  public filterObj: any = {};
  public searchText = '';
  public ratingCustomer;
  public estimatedTripMinMax: any;
  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= config.screenWidth) {
      this.datatableResponsive = true;
    } else {
      this.datatableResponsive = true;
    }
  }

  public ngOnInit(): void {
    this.bookingDetail({
      perPage: this.perPage,
      pageNumber: this.pageNumber,
      tripStatus : this.listScheduledStatus[0].tripStatus,
      tripType : this.listScheduledStatus[0].tripType,
    });

  }
  checkStatus() {   
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    if(this.status == "All"){
      this.filterObj.tripStatus = "Scheduled";
      this.filterObj.tripType = "All"
    }
    if(this.status == "Scheduled"){
      this.filterObj.tripStatus = "Scheduled";
      this.filterObj.tripType = "KMBooking"     
    }
    if(this.status == "Hourly Booking"){     
      this.filterObj.tripStatus = "Scheduled";
      this.filterObj.tripType = "HourlyBooking"
    }
    this.bookingDetail(this.filterObj);

  }

  public bookingDetail(filterObj?) {
    filterObj.searchByName = this.searchByName;   
    this.allBookingServices.getTripList(filterObj).subscribe(
      (response) => {
        if (response.result) {
          const tripData = response.result.rows;
          this.tripList = tripData.map((m) => {
            if (m.driver_details.profileImage) {
              m.driver_details.profileImage = this.s3Service.getSignedUrl(m.driver_details.profileImage);
            }
            if (m.customer_details.profileImage) {
              m.customer_details.profileImage = this.s3Service.getSignedUrl(m.customer_details.profileImage);
            }
            m.customerName = m.customer_details.fullName;
            m.customerCountryCode = m.customer_details.countryCode;
            m.customerMobile = m.customer_details.mobileNumber;
            m.driverName = m.driver_details.fullName;
            m.driverCountryCode = m.driver_details.countryCode;
            m.dirverMobile = m.driver_details.mobileNumber;
            return m;
          });
          this.totalTrip = response.result.count;
        }
      },
      (error) => {
        this.toastrService.error(error.error.message, '');
      }
    );
    this.pageNumber = filterObj.pageNumber;
  }
  public loadPage(page) {
    this.filterObj.perPage = this.perPage;
    this.filterObj.pageNumber = page;
    this._changePage();
  }

  public _changePage() {
    this.bookingDetail(this.filterObj);
  }

  public onPageNumber(event) {
    // tslint:disable-next-line: radix
    const page = parseInt(event.target.value);
    const availablePage = Math.ceil(this.totalTrip / this.perPage);
    if (page > 0 && page <= availablePage) {
      this.loadPage(page);
    }
  }

  public onSearch(text) {
    this.filterObj.pageNumber = this.pageNumber;
    this.filterObj.perPage = this.perPage;
    this.searchByName = text;
    this.bookingDetail(this.filterObj);
  }

  public onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  zoomIn() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom < 22 ? ++this.zoom : null;
  }

  zoomOut() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom > 0 ? --this.zoom : null;
  }
  openModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.rateDriver = data.ratingDriver;
    this.rateCustomer = data.ratingCustomer;
    this.startLocationName = data.startLocationName;
    this.endLocationName = data.endLocationName;
    this.dirs = [
      {
        origin: { lat: this.openData.startLat, lng: this.openData.startLong },
        destination: { lat: this.openData.endLat, lng: this.openData.endLong },
        renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#323234', strokeWeight: 8 } },
        onResp: this.onResponse.bind(this)
      }
    ];
    this.dirs2 = [
      {
        origin: { lat: this.openData.driver_info.addressLatitude, lng: this.openData.driver_info.addressLongitude },
        destination: { lat: this.openData.startLat, lng: this.openData.startLong },
        renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#FDB340', strokeWeight: 8 } },
        onResp: this.onResponseDriver.bind(this)
      },

    ];
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal fullModal' }));
    this.liveDriverLocation(data.driverId, data.customerId);
    this.estimatedTripMinMax = ((this.openData.paymentAmount * 10) / 100).toFixed(2);
  }
  public onResponse(event: any) {
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
  public onResponseDriver(event: any) {
    if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
      const data = event.routes[0].legs[0];
      this.dynamicDistance = data.distance.text.split('km')[0];
      this.dynamicDuration = data.duration.text.split('mins')[0];
    }
  }
  exportAsXLSX(): void {
    this.filterObj.pageNumber = 1;
    this.filterObj.perPage = this.totalTrip;
    this.filterObj.tripStatus = 'Scheduled';
    this.searchByName = '';
    this.bookingDetailExcel(this.filterObj);
  }
  public bookingDetailExcel(filterObj) {
    this.allBookingServices.getTripList(filterObj).subscribe(
      (response) => {
        if (response.result) {
          const tripDataExcel = response.result.rows;
          this.tripListExcel = tripDataExcel.map((obj) => {
            return {
              'trip Id': obj.tripId,
              'trip Date': obj.tripDate,
              'customer Name': obj.customer_details.fullName,
              'customer Mobile': obj.customer_details.mobileNumber,
              'chauffeur Name': obj.driver_details.fullName,
              'chauffeur Mobile': obj.driver_details.mobileNumber,
              'end Location Name': obj.endLocationName,
              'start Location Name': obj.startLocationName,
              'payment Type': obj.paymentType,
              'total Fare': obj.totalFare,
              status: obj.status,
            };
          });
          this.excelService.exportAsExcelFile(this.tripListExcel, 'TripList');
        }
      },
      (error) => {
        this.toastrService.error(error.error.message, '');
      }
    );
    this.pageNumber = filterObj.pageNumber;
  }
  public liveDriverLocation(driverId, customerId) {
    const topic = `${endpoints.mqtt.getDriverLocation}/${driverId}`;
    this.subscription = this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      const location = JSON.parse(message.payload.toString());
      this.dirs2[this.dirs2.length - 1].origin = {
        lat: Number(location.addressLatitude),
        lng: Number(location.addressLongitude)
      };
    });
    const customerTopic = `${endpoints.mqtt.getCustomerLocation}/${customerId}`;
    this.subscriptionCustomer = this.mqttService.observe(customerTopic).subscribe((message: IMqttMessage) => {
      const location = JSON.parse(message.payload.toString());
      this.dirs[this.dirs.length - 1].origin = {
        lat: Number(location.addressLatitude),
        lng: Number(location.addressLongitude)
      };
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionCustomer) {
      this.subscriptionCustomer.unsubscribe();
    }
  }
}
