import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateEmailComponent } from './activate-email.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ActivateEmailComponent
  }
];

@NgModule({
  declarations: [ActivateEmailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ActivateEmailModule { }
