import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewIndexComponent } from './interview-index/interview-index.component';
import { InterviewAddComponent } from './interview-add/interview-add.component';
import { InterviewCategoriesComponent } from './interview-categories/interview-categories.component';
import { InterviewEditComponent } from './interview-edit/interview-edit.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { RouterModule } from '@angular/router';
import { InterviewRoutingModule } from './interview-routing.module';



@NgModule({
  declarations: [
    InterviewListComponent,
    InterviewIndexComponent,
    InterviewAddComponent,
    InterviewCategoriesComponent,
    InterviewEditComponent,
    InterviewItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgSelectModule,
    RouterModule,
    InterviewRoutingModule
  ]
})
export class InterviewModule { }
