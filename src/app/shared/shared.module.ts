import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputRangeModalComponent } from './components/modal/date-input-range-modal/date-input-range-modal.component';
import { InputModalComponent } from './components/modal/input-modal/input-modal.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal/confirm-modal.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { HelpModalComponent } from './components/modal/help-modal/help-modal.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NavComponent } from './components/nav/nav.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingComponent } from './components/paging/paging.component';
import { CustomerNamePipe } from './pipes/customer-name.pipe';
import { CustomerStatusPipe } from './pipes/customer-status.pipe';
import { DepStatusPipe } from './pipes/dep-status.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionHeaderComponent } from '../core/section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReviewItemStatusNamePipe } from './pipes/review-item-status-name.pipe';
import { ReviewStatusNamePipe } from './pipes/review-status-name.pipe';
import { CategoryRefCodePipe } from './pipes/category-ref-code.pipe';
import { RefDecisionPipe } from './pipes/ref-decision.pipe';
import { IdsModalComponent } from './components/modal/ids-modal/ids-modal.component';


@NgModule({
  declarations: [
    PagingComponent,
    PagingHeaderComponent,
    TextInputComponent,
    DateInputComponent,
    ConfirmModalComponent,
    HelpModalComponent,
    CustomerStatusPipe,
    DepStatusPipe,
    InputModalComponent,
    DateInputRangeModalComponent,
    ReviewItemStatusNamePipe,
    ReviewStatusNamePipe,
    CategoryRefCodePipe,
    RefDecisionPipe,
    IdsModalComponent
    /*
    DateInputRangeModalComponent,
    InputModalComponent,
    ConfirmModalComponent,
    DateInputComponent,
    HelpModalComponent,
    TextInputComponent,
    //NavComponent,
    PagingHeaderComponent,
    PagingComponent,
    
    CustomerNamePipe,
    CustomerStatusPipe,
    DepStatusPipe,
    //SectionHeaderComponent
    */
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    NgSelectModule,
    TabsModule
    
    /*
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule,
    ModalModule.forRoot(),
    TabsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxSpinnerModule,
    BreadcrumbModule
    */
  ],
  exports: [
    CommonModule,
    PagingComponent,
    PagingHeaderComponent,
    PaginationModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    DateInputComponent,
    BsDatepickerModule,
    NgSelectModule,
    ModalModule,
    TabsModule,
    CustomerStatusPipe,
    DepStatusPipe
    /*
    CommonModule,
    PagingComponent,
    PagingHeaderComponent,
    PaginationModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    TextInputComponent,
    DateInputComponent,
    BsDatepickerModule,
    //NgSelectModule,
    ModalModule,
    TabsModule,
    CustomerStatusPipe,
    DepStatusPipe,
    RouterModule,
    //NavComponent,
    NgxSpinnerModule,
    BreadcrumbModule
    */
  ]
})
export class SharedModule { }
