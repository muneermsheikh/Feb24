import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvrefComponent } from './cvref/cvref.component';
import { CvreferredlineComponent } from './cvreferredline/cvreferredline.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CvrefLineComponent } from './cvref-line/cvref-line.component';
import { DlForwardComponent } from './dl-forward/dl-forward.component';
import { EmploymentComponent } from './employment/employment.component';
import { EmploymentLineComponent } from './employment-line/employment-line.component';
import { EmploymentModalComponent } from './employment-modal/employment-modal.component';
import { MessagesComponent } from './messages/messages.component';
import { SelectionComponent } from './selection/selection.component';
import { SharedModule } from '../shared/shared.module';
import { CvreferredComponent } from './cvreferred/cvreferred.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    CvrefComponent,
    CvreferredlineComponent,
    AdminIndexComponent,
    CvrefLineComponent,
    DlForwardComponent,
    EmploymentComponent,
    EmploymentLineComponent,
    EmploymentModalComponent,
    MessagesComponent,
    SelectionComponent,
    CvreferredComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
