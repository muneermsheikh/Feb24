import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateEditComponent } from './candidate-edit/candidate-edit.component';
import { CandidateHistoryComponent } from './candidate-history/candidate-history.component';
import { CandidateItemComponent } from './candidate-item/candidate-item.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ChecklistModalComponent } from './checklist-modal/checklist-modal.component';
import { ProspectiveListComponent } from './prospective-list/prospective-list.component';
import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    CandidateEditComponent,
    CandidateHistoryComponent,
    CandidateItemComponent,
    CandidateListComponent,
    ChecklistModalComponent,
    ProspectiveListComponent,
    UploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CandidateModule { }
