import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymtModalComponent } from './employmt-modal/employmt-modal.component';
import { EmploymtIndexComponent } from './employmt-index/employmt-index.component';
import { EmploymtLineComponent } from './employmt-line/employmt-line.component';
import { EmploymtListComponent } from './employmt-list/employmt-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmploymtAddComponent } from './employmt-add/employmt-add.component';
import { EmploymtEditComponent } from './employmt-edit/employmt-edit.component';
import { EmploymtRoutingModule } from './employmt-routing.module';



@NgModule({
  declarations: [
    EmploymtModalComponent,
    EmploymtIndexComponent,
    EmploymtLineComponent,
    EmploymtListComponent,
    EmploymtAddComponent,
    EmploymtEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EmploymtRoutingModule
  ]
})
export class EmploymtModule { }
