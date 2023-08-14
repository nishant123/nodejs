import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [PrivacyPolicyComponent, TermsConditionsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    AuthRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
  ],
})
export class AuthModule { }
