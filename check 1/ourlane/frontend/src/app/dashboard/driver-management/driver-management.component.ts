import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DriverServices } from 'src/app/_services/driver.service';
import { routerLinks } from '../../_config/router-links';
import { ToastrService } from 'ngx-toastr';
import { configImage, allBookingsImgs } from 'src/app/_config/config';
import { configDataTable } from 'src/app/_config/config';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from '../../_services/excel.service';
import { S3Service } from 'src/app/_services/s3.service';
import { MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { endpoints } from 'src/app/_config/url-endpoint';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {


  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('myPanel', { static: false }) myPanel;

  public allBookingsImgs = allBookingsImgs;
  public routeCompletedCancel = routerLinks.allBookings.CompletedCancel;
  public routeOnGoing = routerLinks.allBookings.OnGoing;

  public userDefault = configImage.userDefault;
  public viewIcon = configImage.viewIcon;
  public deleteIcon = configImage.deleteIcon;
  public tripCars = configImage.tripCars;
  public locationIcon = configImage.locationIcon;
  public mapLocationStart = configImage.mapLocationStart;
  public mapDriverLocation = configImage.mapDriverLocation;
  public timeBigIcon = configImage.timeBigIcon;
  public locationBigIcon = configImage.locationBigIcon;
  public locationEndIcon = configImage.locationEndIcon;
  public downloadCSV = configImage.downloadCSV;
  public markerOptions = {
    origin: {
      icon: this.mapLocationStart,
    },
    destination: {
      icon: this.mapDriverLocation,
    }
  };
  public markerOptions2 = {
    origin: {
      icon: '',
    },
    destination: {
      icon: this.locationEndIcon,
    }
  };
  public iconLabels = [];
  public startLocationName = '';
  public endLocationName = '';
  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public datatableResponsive = false;
  public selected = [];
  public configDataTable = configDataTable;
  public searchText = '';
  public rows: any;
  public numberOfRows = 0;
  public rowsTemp: any;
  public ColumnMode = ColumnMode;
  public status: string;
  public openData: any;
  public isReadonly = true;
  public max = 5;
  public perPage = 10;
  public pageNumber = 1;
  public page = 1;
  public SelectionType = SelectionType;
  public dirs = [];
  public dirs2 = [];
  public subscription: Subscription;
  public driverLiveLocation;
  public driverLocationIcon = configImage.locationStartIcon;
  // google maps zoom
  public zoom = 14;
  public driverExcel: any = [];
  public filterObj: any = {
  };
  public tripType: any;
  iconLabels2: { lat: number; lng: number; type: string; address: string; }[];
  constructor(
    private modalService: BsModalService,
    private driverService: DriverServices,
    public toastrService: ToastrService,
    private excelService: ExcelService,
    private translate: TranslateService,
    private s3Service: S3Service,
    private mqttService: MqttService,
  ) {
    this.onResize();
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
    this.refreshData();

  }
  public driverList: any = [];
  refreshData() {
    this.driverService.getDriver().subscribe(res => {
      const data = res.result;
      this.driverList = res.result;
      const arr = [];
      res.result.forEach(m => {
        arr.push({
          driverName: m.fullName,
          countryCode: m.countryCode,
          mobileNumber: m.mobileNumber,
          emailId: m.loginId,
          completedTrips: m.completedTrips,
          rejectedTrips: m.rejectdTrips,
          cancelledTrips: m.cancelledTrips,
          status: m.status,
          driverId: m.id,
          created_at: m.dateOfJoining,
          kmTravelled: m.totalKMsTravelled.toFixed(2),
          rating: m.avgDriverRating,
          uuid: m.uuid,
          earnings: m.totalEarnings,
          locationLat: m.locationLat,
          locationLang: m.locationLang,
          profileImage: m.profileImage ? this.s3Service.getSignedUrl(m.profileImage) : null
        });
      });
      this.rows = arr;
      this.numberOfRows = arr.length;
      this.rowsTemp = arr;
      this.driverExcel = data.map((obj) => {
        return {
          'full Name': obj.fullName,
          'login Id': obj.loginId,
          'mobile Number': obj.mobileNumber,
          'date Of Joining': obj.dateOfJoining,
          'total Earnings': obj.totalEarnings,
          'total KMs Travelled': obj.totalKMsTravelled,
          'total Rating Given Customers': obj.totalRatingGivenCustomers,
          'total Ratings': obj.totalRatings,
          'completed Trips': obj.completedTrips,
          'cancelled Trips': obj.cancelledTrips,
          'rejectd Trips': obj.rejectdTrips,
          'avgDriver Rating': obj.avgDriverRating,
          status: obj.status,
        };
      });
    });
  }
  public loadPage(page) {
    this.rows = this.rowsTemp.slice((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage);
  }


  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  public onPageNumber(page) {
    if (!isNaN(parseInt(page.target.value, 10)) && parseInt(page.target.value, 10) !== 0) {
      this.loadPage(parseInt(page.target.value, 10));
      this.page = page.target.value;
    }
  }
  onActivate(event) {

  }
  onSearch(text) {
    this.rows = this.rowsTemp.filter(f => {
      if ((f.driverName?.toLowerCase())?.includes(text.toLowerCase())
        || (f.mobileNumber?.toLowerCase())?.includes(text.toLowerCase())
        || (f.emailId?.toLowerCase())?.includes(text.toLowerCase())
        || (f.status?.toLowerCase())?.includes(text.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    this.numberOfRows = this.rows.length;
  }
  openModal(template: TemplateRef<any>, data) {
    this.openData = data;
    this.driverLiveLocation = {
      latitude: data.locationLat,
      longitude: data.locationLang
    };
    // Driver Live location
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const topic = `${endpoints.mqtt.getDriverLocation}/${data.driverId}`;
    this.subscription = this.mqttService.observe(topic).subscribe(message => {
      const location = JSON.parse(message.payload.toString());
      this.driverLiveLocation = {
        latitude: location.addressLatitude,
        longitude: location.addressLongitude
      };
    });
    if (data.status === 'Driving') {
      this.filterObj.driverId = data.driverId;
      this.filterObj.tripStatus = 'Ongoing';
      this.filterObj.tripType = 'all';
      this.filterObj.perPage = 10;
      this.filterObj.pageNumber = 1;
      this.driverService.getTripListByDriver(this.filterObj).subscribe(response => {
        const tripData = response.result.rows[0];
        this.endLocationName = tripData?.endLocationName,
          this.startLocationName = tripData?.startLocationName,
          this.dirs = [
            {
              origin: { lat: parseFloat(tripData?.startLat), lng: parseFloat(tripData?.startLong) },
              destination: { lat: parseFloat(tripData?.driver_info.addressLatitude), lng: parseFloat(tripData?.driver_info.addressLongitude) },
              renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#323234', strokeWeight: 8 } },
              onResp: this.onResponse.bind(this)
            }
          ];
        this.dirs2 = [
          {
            origin: { lat: parseFloat(tripData?.driver_info.addressLatitude), lng: parseFloat(tripData?.driver_info.addressLongitude) },
            destination: { lat: parseFloat(tripData?.endLat), lng: parseFloat(tripData?.endLong) },
            renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#FDB340', strokeWeight: 8 } },
            onResp: this.onResponse2.bind(this)
          }
        ];
      });
    }
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'view-data-modal fullModal' }));
  }
  public onResponse(event: any) {
    if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
      const data = event.routes[0].legs[0];
      this.iconLabels = [
        {
          lat: parseFloat(data.start_location.lat()),
          lng: parseFloat(data.start_location.lng()),
          type: 'Pickup',
          address: this.startLocationName
        }
      ];
    }
  }
  public onResponse2(event: any) {
    if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
      const data = event.routes[0].legs[0];
      this.iconLabels2 = [

        {
          lat: parseFloat(data.end_location.lat()),
          lng: parseFloat(data.end_location.lng()),
          type: 'Drop',
          address: this.endLocationName
        },
      ];

    }
  }
  openModalForDelete(template: TemplateRef<any>, data) {
    if (data.status === 'Driving') {
      this.toastrService.error(this.translate.instant('driver.deleteErrorOnDriving'),
        '');
      return false;
    }
    this.openData = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'alert-modal' }));
  }
  zoomIn() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom < 22 ? ++this.zoom : null;
  }

  zoomOut() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom > 0 ? --this.zoom : null;
  }
  deleteDriver(event, uuid, userId) {
    const data = {
      uuid,
      userId
    };
    this.driverService.deleteDriver(data).subscribe(res => {
      if (res.code === 200) {
        this.translate.get('driver.deleteMessage').subscribe(msg => {
          this.toastrService.error(msg,
            '');
        });
        this.refreshData();
      }

    },
      err => {
        this.translate.get('driver.deleteErrorMessage').subscribe(msg => {
          this.toastrService.error(msg,
            '');
        });
      });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.driverExcel, 'DriverManagement');
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
