import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateHistoryComponent } from './candidate-history/candidate-history.component';



const routes: Routes = [
  /*{path: 'register', component: CandidateEditComponent, 
    resolve: {
      categories: CategoryListResolver,
      qualifications: QualificationsResolver,
      agents: AgentsResolver,
      candidate: CandidateResolver
    },
  data: {breadcrumb: 'Register'}},
    */
  {path: 'candidatelist', component: CandidateListComponent, data: {breadcrumb: 'Candidate List'}},
  {path: 'candidatehistory', component: CandidateHistoryComponent, data: {breadcrumb: 'Register'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CandidateRoutingModule { }
