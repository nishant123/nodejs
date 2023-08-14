import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../_config/url-endpoint';
import { Observable } from 'rxjs';
import { AuthServices } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AllBookingServices {

  constructor(private http: HttpClient, private authService: AuthServices) { }

  getTripDetails(tripId): Observable<any> {
    return this.http.get(endpoints.allBookings.GetTripByIdUrl + tripId, this.authService.getAccessHeaders());
  }

  getTripList(options): Observable<any> {
    return this.http.post(endpoints.allBookings.TripListUrl, options);
  }

  completeTrip(body): Observable<any>{
    return this.http.post(endpoints.allBookings.completeTripUrl, body);
  }

}
