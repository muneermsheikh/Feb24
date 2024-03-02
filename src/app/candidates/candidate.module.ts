import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateEditComponent } from './candidate-edit/candidate-edit.component';
import { CandidateHistoryComponent } from './candidate-history/candidate-history.component';
import { CandidateItemComponent } from './candidate-item/candidate-item.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ChecklistModalComponent } from './checklist-modal/checklist-modal.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CandidateEditComponent,
    CandidateHistoryComponent,
    CandidateItemComponent,
    CandidateListComponent,
    ChecklistModalComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
    
  ]
})
export class CandidateModule { }
