import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlTerms } from 'src/app/_pipes/sanitizeTerms.pipe';

const routes: Routes = [
  {
    path: '',
    component: TermsConditionsComponent
  }
];

@NgModule({
  declarations: [TermsConditionsComponent, SanitizeHtmlTerms],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class TermsConditionsModule { }