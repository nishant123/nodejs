import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../_config/url-endpoint';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnalyticsServices {

  constructor(private http: HttpClient) { }

  getTripsOverview(): Observable<any> {
    return this.http.get(endpoints.analytics.getTripsOverviewUrl);
  }
  getTripsTotalOverview(): Observable<any> {
    return this.http.get(endpoints.analytics.getTripsTotalOverviewUrl);
  }
  getTripsLeaders(): Observable<any> {
    return this.http.get(endpoints.analytics.getTripsLeadersUrl);
  }
  getDriverOverview(driverId): Observable<any> {
    const url = `${endpoints.analytics.getDriverOverviewUrl}?driverId=${driverId}`;
    return this.http.get(url);
  }
  getDriverDayData(driverId, startDate): Observable<any> {
    const url = `${endpoints.analytics.getDriverDayDataUrl}?driverId=${driverId}&startDate=${startDate}`;
    return this.http.get(url);
  }
  getCustomerDayData(customerId, startDate): Observable<any> {
    const url = `${endpoints.analytics.getCustomerDayDataUrl}?customerId=${customerId}&startDate=${startDate}`;
    return this.http.get(url);
  }
  getTodayTrips(): Observable<any> {
    return this.http.get(endpoints.analytics.getTodayTripsUrl);
  }
  getMostPickup(): Observable<any> {
    return this.http.get(endpoints.analytics.getMostPickupUrl);
  }
  getMostDrop(): Observable<any> {
    return this.http.get(endpoints.analytics.getMostDropUrl);
  }
  getLiveFeed(): Observable<any> {
    return this.http.get(endpoints.analytics.getLiveFeedUrl);
  }
  getUserLists(role): Observable<any> {
    const body = {
      perPage: 100,
      pageNumber: 1,
      accountStatus: 'isActive',
      condition: {role}
      };
    return this.http.post(endpoints.analytics.userListUrl, body);
  } getCustomerOverview(customerId): Observable<any> {
    const url = `${endpoints.analytics.getCustomerOverviewUrl}?customerId=${customerId}`;
    return this.http.get(url);
  }
}
