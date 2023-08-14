import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCallSupportComponent } from './chat-call-support.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { DatePipe } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
const routes: Routes = [
  {
    path: '',
    component: ChatCallSupportComponent
  }
];

@NgModule({
  declarations: [ChatCallSupportComponent],
  imports: [
    CommonModule,
    SharedModule,  
    PickerModule, 
    RouterModule.forChild(routes),
  ],
  providers: [DatePipe]
})
export class ChatCallSupportModule { }
