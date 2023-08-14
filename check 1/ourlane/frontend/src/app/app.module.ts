import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpConfigInterceptor } from '../app/util/interceptor/httpconfig.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxChatModule } from '@pazznetwork/ngx-chat';

import { ExcelService } from 'src/app/_services/excel.service';
import { NavLeftComponent } from './dashboard/shared-components/nav-left/nav-left.component';
import { HeaderComponent } from './dashboard/shared-components/header/header.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { keys } from './_config/api-keys';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './app/_config/i18n/', '.json');
}

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqttURL,
  port: environment.mqttPort,
  path: environment.mqttPath,
  protocol: 'wss'
};

@NgModule({
  declarations: [
    AppComponent,
    NavLeftComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    DashboardRoutingModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'tostrPosition',
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    NgxChatModule.forRoot(),
    RatingModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AgmCoreModule.forRoot({
      apiKey: keys.agmApiKey
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ExcelService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
