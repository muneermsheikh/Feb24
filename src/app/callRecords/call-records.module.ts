import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallItemComponent } from './call-item/call-item.component';
import { CallListComponent } from './call-list/call-list.component';
import { CallModalComponent } from './call-modal/call-modal.component';



@NgModule({
  declarations: [
    CallItemComponent,
    CallListComponent,
    CallModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CallRecordsModule { }
