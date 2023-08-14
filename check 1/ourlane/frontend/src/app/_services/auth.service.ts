import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { endpoints } from '../_config/url-endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  public userData = new BehaviorSubject<any>({});
  private token: string;
  public readNotificationId = new Subject<any>();

  constructor(private http: HttpClient) { }

  register(body): Observable<any> {
    return this.http.post(endpoints.auth.registerUrl, body);
  }
  login(body): Observable<any> {
    return this.http.post(endpoints.auth.loginUrl, body);
  }
  verifyEmail(body): Observable<any> {
    return this.http.post(endpoints.auth.verifyEmailUrl, body);
  }
  forgetPassword(body): Observable<any> {
    return this.http.post(endpoints.auth.forgetPasswordUrl, body);
  }
  resendVerifyEmail(body): Observable<any> {
    return this.http.post(endpoints.auth.resendVerifyEmailUrl, body);
  }
  setPassword(body): Observable<any> {
    return this.http.post(endpoints.auth.setPasswordUrl, body);
  }
  changePassword(body): Observable<any> {
    return this.http.post(endpoints.auth.chanagePasswordUrl, body);
  }
  deleteAdmin(body): Observable<any> {
    return this.http.post(endpoints.auth.deleteAdminUrl, body);
  }
  multideleteAdmin(body): Observable<any> {
    return this.http.post(endpoints.auth.deleteAllAdminUrl, body);
  }
  approveAdmin(body): Observable<any> {
    return this.http.post(endpoints.auth.approveAdminUrl, body);
  }
  declineAdmin(body): Observable<any> {
    return this.http.post(endpoints.auth.declineAdminUrl, body);
  }
  getUserDetails(): Observable<any> {
    return this.http.get(endpoints.auth.userInfoUrl);
  }
  updateUser(body): Observable<any> {
    return this.http.post(endpoints.auth.updateUserUrl, body);
  }
  getAdminList(body): Observable<any> {
    return this.http.post(endpoints.auth.adminListUrl, body);
  }
  getCustomerTrips(body): Observable<any> {
    return this.http.post(endpoints.auth.customerTrips, body);
  }

  getProfileImage(query) {
    return this.http.get<any>(
      endpoints.auth.getImageByLocationUrl + `?fileName=${query.fileName}`
    );
  }

  getProfileImageData() {
    return this.userData.asObservable();
  }
  setProfileImageData(data) {
    this.userData.next(data);
  }
  getLanguageList(): Observable<any> {
    return this.http.get(endpoints.auth.getLanguageListUrl);
  }
  getCityList(): Observable<any> {
    return this.http.get(endpoints.auth.getCityListUrl);
  }
  getNotfictionLists(body): Observable<any> {
    return this.http.get(endpoints.auth.notfictionListUrl + '?perPage=' +
      body.perPage + '&pageNumber=' + body.pageNumber + '&type=' + body.type, body);
  }
  deleteNotification(body): Observable<any> {
    return this.http.put(endpoints.auth.notificationDeleteUrl, body);
  }
  readNotification(body): Observable<any> {
    return this.http.put(endpoints.auth.notificationReadUrl, body);
  }
  getNotificationEvent() {
    return this.readNotificationId.asObservable();
  }
  sendNotificationEvent(id) {
    this.readNotificationId.next(id);
  }
  public getToken(): string {
    return this.token || (JSON.parse(localStorage.getItem('_u')) ? JSON.parse(localStorage.getItem('_u')).token : '');
  }
  public getAccessHeaders(): object {
    const authorization = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'x-access-token': authorization,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '-1',
        'If-Modified-Since': '0',
      })
    };
    return httpOptions;
  }
}
