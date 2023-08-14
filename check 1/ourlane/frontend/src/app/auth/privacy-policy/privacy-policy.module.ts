import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPrivacy } from 'src/app/_pipes/sanitizePrivacy.pipe';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  declarations: [PrivacyPolicyComponent, SanitizeHtmlPrivacy],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class PrivacyPolicyModule { }