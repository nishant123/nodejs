import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CustomersModule { }
