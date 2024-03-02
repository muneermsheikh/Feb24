import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrlistComponent } from './hrlist/hrlist.component';
import { HrItemComponent } from './hr-item/hr-item.component';
import { AssessQComponent } from './assess-q/assess-q.component';
import { AssessComponent } from './assess/assess.component';
import { AssessLineComponent } from './assess-line/assess-line.component';
import { AssessQbankComponent } from './assess-qbank/assess-qbank.component';
import { AssessStddComponent } from './assess-stdd/assess-stdd.component';
import { HrChecklistComponent } from './hr-checklist/hr-checklist.component';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { HrQComponent } from './hr-q/hr-q.component';
import { ItemQComponent } from './item-q/item-q.component';
import { StddQEditComponent } from './stdd-q-edit/stdd-q-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CvAssessComponent } from './cv-assess/cv-assess.component';
import { EditAssesmentQStddModalComponent } from './edit-assesment-q-stdd-modal/edit-assesment-q-stdd-modal.component';
import { HrRoutingModule } from './hr-routing.module';



@NgModule({
  declarations: [
    HrlistComponent,
    HrItemComponent,
    AssessComponent,
    AssessLineComponent,
    AssessQbankComponent,
    AssessStddComponent,
    HrChecklistComponent,
    HrIndexComponent,
    HrQComponent,
    ItemQComponent,
    StddQEditComponent,
    AssessQComponent,
    CvAssessComponent,
    EditAssesmentQStddModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HrRoutingModule
  ]
})
export class HrModule { }
