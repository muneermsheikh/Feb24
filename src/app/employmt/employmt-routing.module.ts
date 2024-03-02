import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymtIndexComponent } from './employmt-index/employmt-index.component';
import { EmploymtListComponent } from './employmt-list/employmt-list.component';
import { EmploymentsResolver } from '../resolvers/employmentsResolver';
import { EmploymtModalComponent } from './employmt-modal/employmt-modal.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: EmploymtIndexComponent, data: {breadcrumb: 'Employment Index' }},

  {path: 'list', component: EmploymtListComponent,
      resolvers: {
      employments: EmploymentsResolver
  }},
  {path: 'edit/:id', component: EmploymtModalComponent  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmploymtRoutingModule { }
