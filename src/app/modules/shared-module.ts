import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    ToastrModule,
    NgxSpinnerModule,
    ModalModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class SharedModule { }
