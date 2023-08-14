import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { endpoints } from '../_config/url-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ChatDBServices {

  private chatListener = new Subject<any>();
  constructor(private http: HttpClient) { }

  saveChat(data: any): Observable<any> {
    return this.http.post(endpoints.chat.saveChat, data);
  }
  getAllChatTickets(): Observable<any> {
    return this.http.get(endpoints.chat.getTickets);
  }
  resolveChat(ticketId): Observable<any> {
    const data = {
      ticketId
    };
    return this.http.post(endpoints.chat.getResolve, data);
  }
  getChatByTicketId(ticketId): Observable<any> {
    return this.http.get(`${endpoints.chat.getChats}/${ticketId}`);
  }
  getUserLists(role): Observable<any> {
    const body = {
      perPage: 1000,
      pageNumber: 1,
      accountStatus: 'isActive',
      condition: {role}
      };
    return this.http.post(endpoints.analytics.userListUrl, body);
  }
  loadLastMessages(): Observable<any> {
    return this.http.get(endpoints.chat.loadLastMessages);
  }

  updateAssign(ticketId, assignId): Observable<any> {
    const data = {
      ticketId,
      assignId
    };
    return this.http.post(endpoints.chat.updateAssign, data);
  }
  getChatListener(){
    return this.chatListener.asObservable();
  }
  getNewTickets() {
    this.http.get<{responseCode: string,message: string, code: number,result: any}>(endpoints.chat.getNewTickets).subscribe(res => {
      this.chatListener.next(res?.result);
    }); 
  }
}


