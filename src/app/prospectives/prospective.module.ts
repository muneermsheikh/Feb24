import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectiveItemComponent } from './prospective-item/prospective-item.component';
import { ProspectiveListComponent } from './prospective-list/prospective-list.component';
import { ProspectiveSummaryComponent } from './prospective-summary/prospective-summary.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProspectiveItemComponent,
    ProspectiveListComponent,
    ProspectiveSummaryComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProspectiveModule { }
