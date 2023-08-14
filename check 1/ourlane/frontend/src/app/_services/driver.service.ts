import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../_config/url-endpoint';

@Injectable({
  providedIn: 'root'
})
export class DriverServices {

  constructor(private http: HttpClient) { }

  getDriver(): Observable<any> {
    return this.http.get(endpoints.driver.getDriversUrl);
  }

  deleteDriver(data: any): Observable<any> {
    return this.http.put(endpoints.driver.deleteDriverUrl, data);
  }

  getTripListByDriver(options): Observable<any> {
    return this.http.post(endpoints.allBookings.TripListUrl, options);
  }
}


