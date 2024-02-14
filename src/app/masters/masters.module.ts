import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { IndustryTypesComponent } from './industry-types/industry-types.component';
import { MasterEditModalComponent } from './master-edit-modal/master-edit-modal.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { PagingComponent } from '../shared/components/paging/paging.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MasterIndexComponent } from './master-index/master-index.component';
import { RouterModule } from '@angular/router';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    IndustryTypesComponent,
    MasterEditModalComponent,
    QualificationsComponent,
    PagingHeaderComponent,
    PagingComponent,
    CustomerItemComponent,
    CustomerListComponent,
    MasterIndexComponent,
    CustomerEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MastersModule { }
