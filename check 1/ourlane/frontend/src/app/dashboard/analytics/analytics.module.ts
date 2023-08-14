import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { FilterPipeUser } from 'src/app/_pipes/common.pipe';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent
  }
];

@NgModule({
  declarations: [AnalyticsComponent, FilterPipeUser],
  imports: [
    CommonModule,
    SharedModule,
    HighchartsChartModule,
    RouterModule.forChild(routes),
  ]
})
export class AnalyticsModule { }
