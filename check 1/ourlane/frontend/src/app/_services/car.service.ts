import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../_config/url-endpoint';

@Injectable({
  providedIn: 'root'
})
export class CarServices {

  constructor(private http: HttpClient) { }

  createCar(body): Observable<any> {
    return this.http.post(endpoints.cars.createCarUrl, body);
  }
  createCarType(body): Observable<any> {
    return this.http.post(endpoints.cars.createCarTypeUrl, body);
  }
  getCar(data, perPage, pageNumber): Observable<any> {
    const url = `${endpoints.cars.getCarUrl}?perPage=${perPage}&pageNumber=${pageNumber}&keyword=${data}`;
    return this.http.get(url);
  }
  getCarType(data, perPage, pageNumber): Observable<any> {
    const url = `${endpoints.cars.getCarTypeUrl}?perPage=${perPage}&pageNumber=${pageNumber}&searchByName=${data}`;
    return this.http.get(url);
  }

  deleteCar(body): Observable<any> {
    return this.http.post(endpoints.cars.deleteCarUrl, body);
  }

  deleteCarType(body): Observable<any> {
    return this.http.post(endpoints.cars.deleteCarTypeUrl, body);
  }


  updateCar(body): Observable<any> {
    return this.http.post(endpoints.cars.updateCarUrl, body);
  }
  updateCarType(body): Observable<any> {
    return this.http.post(endpoints.cars.updateCarTypeUrl, body);
  }

  getDriver(): Observable<any> {
    return this.http.get(endpoints.cars.getDriverUrl);
  }

  multideleteCar(body): Observable<any> {
    return this.http.post(endpoints.cars.multideletecarUrl, body);
  }

  multideleteCarType(body): Observable<any> {
    return this.http.post(endpoints.cars.multiDeleteCarTypeUrl, body);
  }

}
