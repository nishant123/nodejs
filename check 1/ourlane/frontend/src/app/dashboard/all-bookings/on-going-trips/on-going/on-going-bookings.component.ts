import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { routerLinks } from 'src/app/_config/router-links';
import { allBookingsImgs, configImage } from 'src/app/_config/config';
import { AllBookingServices } from './../../../../_services/all-booking.service';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { endpoints } from 'src/app/_config/url-endpoint';
import { S3Service } from 'src/app/_services/s3.service';

@Component({
  selector: 'app-on-going-bookings',
  templateUrl: './on-going-bookings.component.html',
  styleUrls: ['./on-going-bookings.component.scss']
})
export class OnGoingBookingsComponent implements OnInit {
  tripData: any;
  dirs: any;
  constructor(
    private router: Router,
    private allBookingServices: AllBookingServices,
    private modalService: BsModalService,
    private mqttService: MqttService,
    private s3Service: S3Service
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.urlTripId = event.url.split('/').pop();
      }
    });
  }
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;
  @ViewChild('myPanel', { static: false }) myPanel;
  public userDefault = configImage.userDefault;
  public locationIcon = configImage.locationIcon;
  public locationStartIcon = configImage.locationStartIcon;
  public timeBigIcon = configImage.timeBigIcon;
  public locationBigIcon = configImage.locationBigIcon;
  public mapLocationStart = configImage.mapLocationStart;
  public locationEndIcon = configImage.locationEndIcon;
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
      icon: ''
    }
  };
  iconLabels = [];
  public allBookingsImgs = allBookingsImgs;
  public tripDuration: number;
  public tripDistance: number;
  // initial center position
  public lat: number = undefined;
  public lng: number = undefined;

  public endLat: number = undefined;
  public endLng: number = undefined;
  public driverlat: number = undefined;
  public driverlng: number = undefined;
  // google maps zoom
  public zoom = 14;
  // Get Directions
  public directions = [];
  public directions2 = [];
  public directions3 = [];
  public subscription;

  public routeOnGoing = routerLinks.allBookings.OnGoing;
  public modalRef: BsModalRef;
  public loadingIndicator = true;
  public reorderable = true;
  public screenWidth: number;
  public status: string;
  public estimatedTripMinMax: any;

  public activeTrip: {
    customerMobileNumber: string,
    customerName: string,
    customerImage: any,
    customerCountrycode: any,
    driverCountryCode: any,
    driverMobileNumber: string,
    driverName: string,
    driverImage: any,
    estimatedTripFare: number,
    endLong: number,
    endLat: number,
    endLocationName: string,
    startLocationName: string,
    startLat: number,
    startLong: number,
    paymentType: string,
    status: string,
    tripDate: Date,
    tripId: string,
    bookedHours: number,
  };
  public urlTripId: string;
  // tslint:disable-next-line: member-ordering
  public dynamicDistance: any;
  public dynamicDuration: any;

  ngOnInit(): void {
    this.viewActiveTripDetails(this.urlTripId);
  }

  viewActiveTripDetails(tripId: string) {
    this.allBookingServices.getTripDetails(tripId).subscribe(res => {
      if (res.result && res.result.startLat && res.result.startLong) {
        this.setTripData(res.result);
      }
    });
  }
  setTripData(tripData) {
    this.endLat = tripData.endLat;
    this.endLng = tripData.endLong;
    this.lat = tripData.startLat;
    this.lng = tripData.startLong;
    this.driverlat = tripData.driver_info.addressLatitude;
    this.driverlng = tripData.driver_info.addressLongitude;

    this.estimatedTripMinMax = ((tripData.paymentAmount * 10) / 100).toFixed(2);

    this.directions = [
      {
        origin: { lat: tripData.startLat, lng: tripData.startLong },
        destination: { lat: tripData.endLat, lng: tripData.endLong },
        renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#323234', strokeWeight: 8 } },
        onResp: this.onResponse.bind(this)
      },

    ];
    this.directions2 = [
      {
        origin: { lat: tripData.driver_info.addressLatitude, lng: tripData.driver_info.addressLongitude },
        destination: { lat: tripData.startLat, lng: tripData.startLong },
        renderOptions: { suppressMarkers: true, polylineOptions: { strokeColor: '#FDB340', strokeWeight: 8 } },
        onResp: this.onResponseDriver.bind(this)
      }
    ];


    this.activeTrip = {
      customerCountrycode: tripData.customer_details.countryCode ? tripData.customer_details.countryCode : null,
      customerMobileNumber: tripData.customer_details.mobileNumber ? tripData.customer_details.mobileNumber : null,
      customerName: tripData.customer_details.fullName ? tripData.customer_details.fullName : null,
      driverCountryCode: tripData.driver_details.countryCode ? tripData.driver_details.countryCode : null,
      driverMobileNumber: tripData.driver_details.mobileNumber ? tripData.driver_details.mobileNumber : null,
      driverName: tripData.driver_details.fullName ? tripData.driver_details.fullName : null,
      estimatedTripFare: tripData.paymentAmount ? tripData.paymentAmount : null,
      endLong: tripData.endLong ? tripData.endLong : null,
      endLat: tripData.endLat ? tripData.endLat : null,
      endLocationName: tripData.endLocationName ? tripData.endLocationName : null,
      startLocationName: tripData.startLocationName ? tripData.startLocationName : null,
      startLat: tripData.startLat ? tripData.startLat : null,
      startLong: tripData.startLong ? tripData.startLong : null,
      paymentType: tripData.paymentType ? tripData.paymentType : null,
      status: tripData.status ? tripData.status : null,
      tripDate: tripData.tripDate ? tripData.tripDate : null,
      tripId: tripData.tripId ? tripData.tripId : null,
      customerImage: tripData.customer_details.profileImage ? this.s3Service.getSignedUrl(tripData.customer_details.profileImage) : null,
      driverImage: tripData.driver_details.profileImage ? this.s3Service.getSignedUrl(tripData.driver_details.profileImage) : null,
      bookedHours:tripData.bookedHours ? tripData.bookedHours : null,
    }; 
    this.liveDriverLocation(tripData.driverId, tripData.customerId);
  }




  public onResponse(event: any) {
    if (!this.tripDistance || !this.tripDuration) {
      if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
        const data = event.routes[0].legs[0];
        this.iconLabels = [
          {
            lat: data.start_location.lat(),
            lng: data.start_location.lng(),
            type: 'Pickup',
            address: this.activeTrip.startLocationName
          },
          {
            lat: data.end_location.lat(),
            lng: data.end_location.lng(),
            type: 'Drop',
            address: this.activeTrip.endLocationName
          }
        ];
        this.tripDistance = data.distance.text.split(' ')[0];
        this.tripDuration = data.duration.text.split(' ')[0];
      }
    }
  }
  public onResponseDriver(event: any) {
    if (event.routes.length > 0 && event.routes[0].legs.length > 0) {
      const data = event.routes[0].legs[0];
      this.dynamicDistance = data.distance.text.split('km')[0];
      this.dynamicDuration = data.duration.text.split('mins')[0];
    }
  }

  public liveDriverLocation(driverId, customerId) {
    const topic = `${endpoints.mqtt.getDriverLocation}/${driverId}`;
    this.subscription = this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      const location = JSON.parse(message.payload.toString());
      this.directions2[this.directions.length - 1].origin = {
        lat: Number(location.addressLatitude),
        lng: Number(location.addressLongitude)
      };
    });
    // const customerTopic = `${endpoints.mqtt.getCustomerLocation}/${customerId}`;
    // this.subscription = this.mqttService.observe(customerTopic).subscribe((message: IMqttMessage) => {
    //   const location = JSON.parse(message.payload.toString());
    //   this.dirs[this.dirs.length - 1].origin = {
    //     lat: Number(location.addressLatitude),
    //     lng: Number(location.addressLongitude)
    //   };
    // });
  }

  zoomIn() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom < 22 ? ++this.zoom : null;
  }

  zoomOut() {
    // tslint:disable-next-line: no-unused-expression
    this.zoom > 0 ? --this.zoom : null;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // this.mqttService.unsubscribe(this.driverId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
