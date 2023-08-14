import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverManagementComponent } from './driver-management.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: DriverManagementComponent
  }
];

@NgModule({
  declarations: [DriverManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmSnazzyInfoWindowModule,
    AgmDirectionModule,
    AgmCoreModule
  ]
})
export class DriverManagementModule { }
