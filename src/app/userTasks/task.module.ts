import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskLineComponent } from './task-line/task-line.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskModalComponent,
    TaskEditComponent,
    TaskLineComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
    RouterModule
  ]
})
export class TaskModule { }