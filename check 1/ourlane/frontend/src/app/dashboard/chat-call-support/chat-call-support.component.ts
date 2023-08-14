import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { configImage, chatCredentials } from 'src/app/_config/config';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';

import {
  ChatBackgroundNotificationService,
  ChatListStateService,
  ChatService,
  ChatServiceToken,
  Contact,
  ContactFactoryService,
  LogInRequest,
  LogLevel,
  LogService,
  Message,
  MultiUserChatPlugin,
  Room,
  UnreadMessageCountPlugin
} from '@pazznetwork/ngx-chat';
import { environment } from 'src/environments/environment';
import { ChatDBServices } from 'src/app/_services/chatdb.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { S3Service } from 'src/app/_services/s3.service';

@Component({
  selector: 'app-chat-call-support',
  templateUrl: './chat-call-support.component.html',
  styleUrls: ['./chat-call-support.component.scss']
})
export class ChatCallSupportComponent implements OnInit {

  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  



  public closeIcon = configImage.closeIcon;
  public searchIcon = configImage.searchIcon;
  @Input()
  public contact: Contact;

  @Input()
  public room: Room;

  @Output()
  public messageSent = new EventEmitter<void>();



  @ViewChild('chatInput')
  chatInput: ElementRef;

  @ViewChild('chatList') private chatList: ElementRef;

  @ViewChild('zoom') zoom: TemplateRef<any>;
  public activeTab = 'drivers';
  public drivers = true;
  public newAndRes = true;
  public downArrow = configImage.downArrow;
  public chatterName = '';
  public tempRows = [];
  public userDefault = configImage.userDefault;
  public rows = [];
  public adminId: any;
  public newCount = 0;
  public resolveCount = 0;
  public customerNewCount = 0;
  public driverNewCount = 0;
  public CustomerResolveCount = 0;
  public domain: string;
  public service: string;
  public password: string;
  public username: string;
  public toJid = '';
  public tickets = [];
  public userRole = 'Driver';
  public menuActive = true;
  public chatId = '';
  public contacts: Observable<Contact[]>;
  public multiUserChatPlugin: MultiUserChatPlugin;
  public unreadMessageCountPlugin: UnreadMessageCountPlugin;
  public registrationMessage: string;
  public datetime = new Date();
  public modalRef: BsModalRef;
  public adminList: any[];
  public tempAdminList: any[];
  public driverList: any[];
  public customerList: any[];
  public adminName: any;
  public adminProfileImg: any;
  public adminSearch = '';
  public isSuperAdmin = false;
  public activeTicketId: any;
  public role: string = localStorage.getItem('role');
  public newMessageFrom = '';
  public dataMessage;
  public chatListData: any = [];
  public zoomImageLink: string;
  constructor(
    @Inject(ChatServiceToken) public chatService: ChatService,
    private contactFactory: ContactFactoryService,
    private logService: LogService,
    private chatListStateService: ChatListStateService,
    chatBackgroundNotificationService: ChatBackgroundNotificationService,
    private chatDbService: ChatDBServices,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private s3Service: S3Service
  ) {
    this.onLogin();
    this.logService.logLevel = LogLevel.Debug;
    this.chatService.state$.subscribe((state) => this.stateChanged(state));
    this.multiUserChatPlugin = this.chatService.getPlugin(MultiUserChatPlugin);
    this.unreadMessageCountPlugin = this.chatService.getPlugin(UnreadMessageCountPlugin);
    chatBackgroundNotificationService.enable();
    // @ts-ignore
    window.chatService = chatService;
    this.chatService.message$.subscribe(mes => {
      if (this.toJid === mes.name) {
        const element = document.createElement('li');
        const elementSpan = document.createElement('span');
        const elementSpanWithInfo = document.createElement('span');
        const elementMsg = document.createElement('span');
        const message = JSON.parse(this.decrypt(mes.messages[mes.messages.length - 1].body));
        const elementImgContent = document.createElement('img');
        const elementVideo = document.createElement('audio');
        const elementSource = document.createElement('source');
        elementVideo.style.display = 'none';
        console.log(message);
        if (message.type !== 'text') {
          const fileName = message.awsUrl.slice(message.awsUrl.lastIndexOf('/') + 1);
          const fileUrl = this.s3Service.getSignedUrl(fileName);
          if (message.type === 'image') {
            elementImgContent.src = fileUrl;
            elementImgContent.style.height = '150px';
            elementImgContent.style.cursor = 'pointer';
            elementImgContent.onclick = this.zoomImage.bind(this, fileUrl);
          } else if (message.type === 'audio') {
            elementVideo.controls = true;
            elementSource.src = fileUrl;
            elementVideo.style.display = 'block';
            elementVideo.style.width = '250px';
          }
        }
        elementSpanWithInfo.innerHTML = this.chatterName + ', ' + this.datePipe.transform(mes.messages[mes.messages.length - 1].datetime, 'HH:mm a');
        elementSpanWithInfo.style.fontSize = '10px';
        elementSpanWithInfo.style.textAlign = 'left';
        elementMsg.style.display = 'grid';
        const elementImg = document.createElement('img');
        elementImg.src = './assets/images/user.png';
        elementImg.style.width = '33px';
        elementImg.style.height = '33px';
        elementImg.style.borderRadius = '33px';
        elementImg.style.marginRight = '5px';
        elementImg.style.marginTop = '24px';
        elementSpan.innerHTML = message.text;
        if (message.text.length === 0) {
          elementSpan.style.display = 'none';
        }
        elementSpan.style.background = '#9CCAC7';
        elementSpan.style.padding = '10px';
        element.style.margin = '10px';
        element.style.display = 'flex';
        element.style.justifyContent = 'flex-end';
        elementSpan.style.width = 'max-content';
        elementSpan.style.height = '38px';
        elementSpan.style.marginTop = '4px';
        element.style.fontSize = '10px';
        element.style.fontFamily = 'HelveticaNeueMed';
        element.style.textAlign = 'right';
        elementSpan.style.borderRadius = '7px';
        elementSpan.style.opacity = '1';
        elementSpan.style.color = '#ffffff';
        elementMsg.appendChild(elementSpanWithInfo);
        elementMsg.appendChild(elementSpan);
        elementMsg.appendChild(elementImgContent);
        elementMsg.appendChild(elementVideo);
        element.appendChild(elementImg);
        element.appendChild(elementMsg);
        elementVideo.appendChild(elementSource);
        document.getElementById('message-list').appendChild(element);

      } else {
        this.newMessageFrom = mes.name;
      }
      this.scrollToBottom();
      // this.getAllTickets();
      this.chatDbService.getNewTickets();
    });
  }
  addContact(jid: string) {
    this.chatService.addContact(jid);
  }
  public openModalDriver(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  onLogin() {
    const logInRequest: LogInRequest = {
      domain: environment.chatDomain,
      service: environment.chatService,
      password: chatCredentials.password,
      username: chatCredentials.username,
    };
    this.chatService.logIn(logInRequest);
  }
  private async stateChanged(state: 'disconnected' | 'connecting' | 'online') {
    console.log('state changed!', state);
  }

  public sendMessage() {
    this.showEmojiPicker = false; 
    if (this.message.trim().length > 0) {
      const dataMessage = {
        text: this.message,
        type: 'text'
      };
      this.dataMessage = JSON.stringify(dataMessage);
      if (this.room) {
        this.chatService.getPlugin(MultiUserChatPlugin).sendMessage(this.room, this.dataMessage);
      } else {
        const encryptedMessage = this.encrypt(this.dataMessage);
        this.chatService.sendMessage(this.toJid, encryptedMessage);
      }
      const data = {
        fromId: `${chatCredentials.username}@${environment.chatDomain}`,
        toId: this.toJid,
        name: chatCredentials.userName,
        userRole: chatCredentials.userRole,
        assignId: chatCredentials.assignee
      };
      this.chatDbService.saveChat(data).subscribe(result => {
        this.loadLastMessage();
      });
      const element = document.createElement('li');
      const elementSpan = document.createElement('span');
      const timeSpan = document.createElement('span');
      timeSpan.innerHTML = this.datePipe.transform(new Date(), 'HH:mm a');
      elementSpan.innerHTML = this.message;
      elementSpan.style.background = '#F5FAF9';
      elementSpan.style.padding = '10px';
      element.style.margin = '10px';
      element.style.display = 'grid';
      elementSpan.style.width = 'max-content';
      elementSpan.style.height = '38px';
      elementSpan.style.marginTop = '4px';
      element.style.textAlign = 'left';
      elementSpan.style.borderRadius = '7px';
      element.style.fontSize = '10px';
      element.style.fontFamily = 'HelveticaNeueMed';
      elementSpan.style.opacity = '1';
      elementSpan.style.color = '#9095A4';
      element.appendChild(timeSpan);
      element.appendChild(elementSpan);
      document.getElementById('message-list').appendChild(element);
      this.message = '';
    }
    this.scrollToBottom();
    this.messageSent.emit();
    return false;
  }
  ngOnInit(): void {
    if (this.role === 'SUPER_ADMIN') {
      this.isSuperAdmin = true;
      this.getUserLists('ADMIN');
    }
    this.rows = [];
    this.contacts = this.chatService.contactsSubscribed$;
    this.getAllTickets();
    this.chatListData = this.rows;

  }
  getAllTickets() {

    this.rows = [];

    this.resolveCount = 0;
    this.driverNewCount = 0;
    if (this.isSuperAdmin) {
      this.chatDbService.getAllChatTickets().subscribe(res => {
        this.tickets = res.result;
        this.tickets.forEach(f => {

          if (f.userRole === this.userRole && !f.isResolve) {
            f.active = false;
            f.unreadCount = 0;
            this.driverNewCount++;
            this.rows.push(f);
          } else if (f.userRole === this.userRole && f.isResolve) {
            this.resolveCount++;
          }
          if (f.userRole !== this.userRole && !f.isResolve) {
            f.active = false;
            f.unreadCount = 0;
            this.customerNewCount++;
          } else if (f.userRole !== this.userRole && f.isResolve) {
            this.CustomerResolveCount++;
          }
        });
        if (this.rows.length > 0) {
          this.activateClass(this.rows[0]);
        }
        this.tempRows = this.rows;
        this.newCount = this.rows.length;
        this.rows.forEach(r => {
          if (r.fromId === this.newMessageFrom) {
            r.unreadCount++;
          }
        });
        this.loadLastMessage();

      });
    } else {
      this.chatDbService.getAllChatTickets().subscribe(res => {
        this.tickets = res.result;
        const adminUserId = localStorage.getItem('adminUserId');
        this.tickets.forEach(f => {
          // tslint:disable-next-line: triple-equals
          if (adminUserId == f.assignId) {
            if (f.userRole === this.userRole && !f.isResolve) {
              f.active = false;
              f.unreadCount = 0;
              this.driverNewCount++;
              this.rows.push(f);
            } else if (f.userRole === this.userRole && f.isResolve) {
              this.resolveCount++;
            }
            if (f.userRole !== this.userRole && !f.isResolve) {
              f.active = false;
              f.unreadCount = 0;
              this.customerNewCount++;
            } else if (f.userRole !== this.userRole && f.isResolve) {
              this.CustomerResolveCount++;
            }
          }
        });
        this.tempRows = this.rows;
        this.newCount = this.rows.length;
        this.rows.forEach(r => {
          if (r.fromId === this.newMessageFrom) {
            r.unreadCount++;
          }
        });
        this.activateClass(this.rows[0]);
        this.loadLastMessage();
      });
    }
  }
  scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } catch (err) { }
  }
  resolveChat() {
    this.chatDbService.resolveChat(this.chatId).subscribe(res => {
      this.ngOnInit();
      this.chatDbService.getNewTickets();
    });
  }
  changeContent(activeTabVal: string) {
    this.activeTab = activeTabVal;
  }
  onSearch(event) {
    this.rows = this.tempRows.filter(f => {
      if ((f.name?.toLowerCase()).includes(event?.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }
  changeTab(event, val) {
    this.drivers = val;
    if (this.drivers) {
      this.userRole = 'Driver';
    } else {
      this.userRole = 'Customer';
    }
    this.changeNewOrRes('', this.newAndRes);
  }

  changeNewOrRes(event, val) {
    this.rows = [];
    this.newAndRes = val;
    this.resolveCount = 0;
    this.newCount = 0;
    this.activeTicketId = null;
    this.adminName = '';
    this.adminProfileImg = '';

    document.getElementById('message-list').innerHTML = '';
    this.chatterName = '';
    if (this.newAndRes) {
      this.menuActive = true;
      this.tickets.forEach(f => {
        if (f.userRole === this.userRole && !f.isResolve) {
          f.active = false;
          this.rows.push(f);
        }
        if (f.userRole === this.userRole && f.isResolve) {
          this.resolveCount++;
        }
      });
      this.newCount = this.rows.length;
    } else {
      this.menuActive = false;
      this.tickets.forEach(f => {
        if (f.userRole === this.userRole && f.isResolve) {
          f.active = false;
          this.rows.push(f);
          this.resolveCount++;
        }
        if (f.userRole === this.userRole && !f.isResolve) {
          f.active = false;
          this.rows.push(f);
          this.newCount += 1;
        }
      });
    }

    this.chartList();
    this.tempRows = this.rows;
  }
  chartList() {
    this.chatListData = [];
    this.rows.forEach(obj => {
      const active = obj && obj.active;
      const assignId = obj && obj.assignId;
      const createdAt = obj && obj.createdAt;
      const fromId = obj && obj.fromId;
      const id = obj && obj.id;
      const isDeleted = obj && obj.isDeleted;
      const isResolve = obj && obj.isResolve;
      const lastMessage = obj && obj.lastMessage ? JSON.parse(obj.lastMessage) : '';
      const messageDateTime = obj && obj.messageDateTime;
      const name = obj && obj.name;
      const toId = obj && obj.toId;
      const unreadCount = obj && obj.unreadCount;
      const updatedAt = obj && obj.updatedAt;
      const userRole = obj && obj.userRole;
      const uuid = obj && obj.uuid;
      const listObj = {
        active,
        assignId,
        createdAt,
        fromId,
        id,
        isDeleted,
        isResolve,
        messageDateTime,
        name,
        toId,
        unreadCount,
        updatedAt,
        userRole,
        uuid,
        lastMessage: lastMessage.text ? lastMessage.text : '',
        awsUrl: lastMessage.awsUrl ? lastMessage.awsUrl : ''
      };
      this.chatListData.push(listObj);
      console.log(this.chatListData)
    });
    this.loadLastMessage();
  }
  activateClass(row) {
    this.adminName = '';
    this.adminProfileImg = '';
    this.activeTicketId = row.id;
    row.unreadCount = 0;
    this.chatterName = row.name;
    this.rows.forEach(f => {
      if (f.id === row.id) {
        row.active = true;
        this.toJid = f.fromId;
        this.chatId = '' + f.id;

        // this.adminList.forEach(a => {
        //   // tslint:disable-next-line: triple-equals
        //   if (a.id == parseInt(f.assignId, 10)) {
        //     this.adminName = a.fullName;
        //     this.adminProfileImg = a.profileImage;
        //   }
        // });
        this.getChatByTicketId();
        this.chartList();
      } else {
        f.active = false;
      }
    });
  }
  searchAdmins() {
    this.adminList = this.tempAdminList.filter(f => {
      if ((f.fullName?.toLowerCase())?.includes(this.adminSearch.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }
  getChatByTicketId() {
    document.getElementById('message-list').innerHTML = '';
    this.chatDbService.getChatByTicketId(this.chatId).subscribe(res => {
      res.result.forEach(async f => {
        f.body = await this.decrypt(f.body);
        const msg = JSON.parse(f.body);
        const dateNow: any = new Date();
        const dt = this.datePipe.transform(f.sentDate, 'yyyy/MM/dd');
        const createdAt: any = new Date(dt);
        let delta = Math.abs(dateNow - createdAt) / 1000;
        const days = Math.floor(delta / 86400);
        let timeFlag = '';
        delta -= days * 86400;
        if (days < 1) {
          timeFlag = '';
        } else if (days === 1) {
          timeFlag = 'Yesterday';
        } else {
          timeFlag = this.datePipe.transform(f.sentDate, 'dd/MM/yyyy');
        }
        if (f.fromJID === `${chatCredentials.username}@${environment.chatDomain}`) {
          const element = document.createElement('li');
          const elementSpan = document.createElement('span');
          const timeSpan = document.createElement('span');
          timeSpan.innerHTML = timeFlag + ' ' + this.datePipe.transform(f.sentDate, 'HH:mm a');
          timeSpan.style.fontSize = '10px';
          elementSpan.innerHTML = msg.text;
          elementSpan.style.background = '#F5FAF9';
          elementSpan.style.padding = '10px';
          element.style.margin = '10px';
          element.style.display = 'grid';
          elementSpan.style.width = 'max-content';
          elementSpan.style.height = '38px';
          elementSpan.style.marginTop = '4px';
          element.style.textAlign = 'left';
          elementSpan.style.borderRadius = '7px';
          element.style.fontSize = '10px';
          element.style.fontFamily = 'HelveticaNeueMed';
          elementSpan.style.opacity = '1';
          elementSpan.style.color = '#9095A4';
          element.appendChild(timeSpan);
          element.appendChild(elementSpan);
          document.getElementById('message-list').appendChild(element);
        } else {
          const element = document.createElement('li');
          const elementSpan = document.createElement('span');
          const elementSpanWithInfo = document.createElement('span');
          const elementMsg = document.createElement('span');
          const greenDot = document.createElement('span');
          greenDot.style.width = '7px';
          greenDot.style.height = '7px';
          greenDot.style.background = '#04E013';
          greenDot.style.border = '4px solid #04E0132E';
          greenDot.style.borderRadius = '50%';
          greenDot.style.opacity = '1';
          greenDot.style.zIndex = '10';
          greenDot.style.marginTop = '50px';
          greenDot.style.bottom = '5px';
          greenDot.style.left = '30px';
          greenDot.style.marginRight = '13px';
          greenDot.style.marginLeft = '-18px';
          greenDot.innerHTML = '&nbsp;';
          elementSpanWithInfo.innerHTML = this.chatterName + ', ' + timeFlag + ' ' + this.datePipe.transform(f.sentDate, 'HH:mm a');
          elementSpanWithInfo.style.textAlign = 'left';
          elementSpanWithInfo.style.fontSize = '10px';
          elementMsg.style.display = 'grid';
          const elementImgContent = document.createElement('img');
          const elementVideo = document.createElement('audio');
          const elementSource = document.createElement('source');
          elementVideo.style.display = 'none';
          if (msg.type !== 'text') {
            const fileName = msg.awsUrl.slice(msg.awsUrl.lastIndexOf('/') + 1);
            const fileUrl = this.s3Service.getSignedUrl(fileName);
            if (msg.type === 'image') {
              elementImgContent.src = fileUrl;
              elementImgContent.style.height = '150px';
              elementImgContent.style.cursor = 'pointer';
              elementImgContent.onclick = this.zoomImage.bind(this, fileUrl);
            } else if (msg.type === 'audio') {
              elementVideo.controls = true;
              elementSource.src = fileUrl;
              elementVideo.style.display = 'block';
              elementVideo.style.width = '250px';
            }
          }
          const elementImg = document.createElement('img');
          elementImg.src = './assets/images/user.png';
          elementImg.style.width = '33px';
          elementImg.style.height = '33px';
          elementImg.style.borderRadius = '33px';
          elementImg.style.marginRight = '5px';
          elementImg.style.marginTop = '24px';
          elementSpan.innerHTML = msg.text;
          if (msg.text.length === 0) {
            elementSpan.style.display = 'none';
          }
          elementSpan.style.background = '#9CCAC7';
          elementSpan.style.padding = '10px';
          element.style.margin = '10px';
          element.style.display = 'flex';
          element.style.position = 'relative';
          element.style.justifyContent = 'flex-end';
          elementSpan.style.width = 'max-content';
          element.style.fontSize = '10px';
          elementSpan.style.height = '38px';
          elementSpan.style.marginTop = '4px';
          element.style.fontFamily = 'HelveticaNeueMed';
          element.style.textAlign = 'right';
          elementSpan.style.borderRadius = '7px';
          elementSpan.style.opacity = '1';
          elementSpan.style.color = '#ffffff';
          elementMsg.appendChild(elementSpanWithInfo);
          elementMsg.appendChild(elementSpan);
          elementMsg.appendChild(elementImgContent);
          elementMsg.appendChild(elementVideo);
          element.appendChild(elementImg);
          element.appendChild(greenDot);
          element.appendChild(elementMsg);
          elementVideo.appendChild(elementSource);
          document.getElementById('message-list').appendChild(element);
        }
      });
      this.scrollToBottom();
    });
  }
  public getUserLists(role: string) {
    this.chatDbService.getUserLists(role).subscribe(
      (response: any) => {
        if (response && response.result && response.result.rows) {
          response.result.rows.map(ele => {
            if (ele.profileImage) {
              ele.profileImage = this.s3Service.getSignedUrl(ele.profileImage);
            }
          });
          if (role === 'DRIVER') {
            this.driverList = response.result.rows;
          }
          if (role === 'CUSTOMER') {
            this.customerList = response.result.rows;
          }
          if (role === 'ADMIN') {
            this.adminList = response.result.rows;
            this.tempAdminList = response.result.rows;
          }
        }
      },
      error => console.error(error)
    );
  }
  public closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
  public onItemAdminChange(value: { fullName: any; role: any; id: any; profileImage: any; }) {
    this.adminName = value.fullName;
    this.adminId = value.id;
    this.adminProfileImg = value.profileImage;
    this.chatDbService.updateAssign(this.chatId, this.adminId).subscribe(res => {
      this.rows.forEach(f => {
        if (f.id === this.activeTicketId) {
          f.assignId = value.id;
        }
      });
    });
    this.closeModal();
  }
  public loadLastMessage() {
    this.chatDbService.loadLastMessages().subscribe(res => {
      res.result.forEach(msg => {
        this.rows.forEach(f => {
          if (msg.ticketId === f.id) {
            msg.body = this.decrypt(msg.body);
            f.lastMessage = msg.body;
            const dateNow: any = new Date();
            const dt = this.datePipe.transform(msg.sentDate, 'yyyy/MM/dd');
            const createdAt: any = new Date(dt);
            let delta = Math.abs(dateNow - createdAt) / 1000;
            const days = Math.floor(delta / 86400);
            let timeFlag = '';
            delta -= days * 86400;
            if (days < 1) {
              timeFlag = this.datePipe.transform(msg.sentDate, 'HH:mm a');
            } else if (days === 1) {
              timeFlag = 'Yesterday';
            } else {
              timeFlag = this.datePipe.transform(msg.sentDate, 'dd/MM/yyyy');
            }
            f.messageDateTime = timeFlag;
            return false;
          }
        });
      });
    });
  }

  zoomImage(url: string) {
    this.zoomImageLink = url;
    this.modalRef = this.modalService.show(this.zoom, {class: 'modal-lg'});
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, chatCredentials.cipherKey).toString();
  }
  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, chatCredentials.cipherKey).toString(CryptoJS.enc.Utf8);
  }

  toggleEmojiPicker() {   
    this.showEmojiPicker = !this.showEmojiPicker;  }

  addEmoji(event) {  
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;    
  }

}
