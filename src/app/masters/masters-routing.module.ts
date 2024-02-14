import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { IndustryTypesComponent } from './industry-types/industry-types.component';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes = [
  {path: '', component: CategoriesComponent}, 
  {path: 'Qualifications', component:QualificationsComponent , data: {breadcrumb: {alias: 'qualifications'}}},
  {path: 'IndustryTypes', component:IndustryTypesComponent , data: {breadcrumb: {alias: 'Industry Types'}}},
  {path: 'associates', component:CustomerListComponent , data: {breadcrumb: {alias: 'Customers'}}},
  {path: 'vendors', component:CustomerListComponent , data: {breadcrumb: {alias: 'Vendors'}}},
  {path: 'clients/:id', component:CustomerEditComponent , data: {breadcrumb: {alias: 'Customer Edit'}}},
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MastersRoutingModule { }
