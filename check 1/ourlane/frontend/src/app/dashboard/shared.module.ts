import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NumericInput } from '../_Directives/directive';


@NgModule({
  declarations: [NumericInput],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbPaginationModule,
    Ng2TelInputModule,
    NgxDropzoneModule,
    RatingModule
  ],
  exports: [
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbPaginationModule,
    Ng2TelInputModule,
    NgxDropzoneModule,
    RatingModule,
    NumericInput
  ]
})
export class SharedModule { }
