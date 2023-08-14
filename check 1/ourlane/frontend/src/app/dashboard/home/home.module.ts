import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    WebcamModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
