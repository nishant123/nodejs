import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../_config/url-endpoint';

@Injectable({
  providedIn: 'root'
})
export class StaticServices {

  constructor(private http: HttpClient) { }

  termsAndCondition(): Observable<any> {
    return this.http.get(endpoints.staticPage.termsAndCondition);
  }
  privacyPolicy(): Observable<any> {
    return this.http.get(endpoints.staticPage.privacyPolicy);
  }


}
