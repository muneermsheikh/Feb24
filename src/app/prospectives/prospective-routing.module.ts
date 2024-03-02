import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CandidateHistoryComponent } from '../candidates/candidate-history/candidate-history.component';
import { ContactResultResolver } from '../resolvers/admin/contactResultResolver';
import { EmployeeIdsAndKnownAsResolver } from '../resolvers/employeeIdsAndKnownAsResolver';
import { HrGuard } from '../guards/hr.guard';
import { ProspectiveListComponent } from './prospective-list/prospective-list.component';
import { PreventUnsavedChangesForProspectsGuard } from '../guards/prevent-unsaved-changes-for-prospects.guard';
import { ProspectiveSummaryComponent } from './prospective-summary/prospective-summary.component';
import { ProspectiveSummaryResolver } from '../resolvers/admin/prospectiveSummaryResolver';

const routes = [
  {path: '', component: ProspectiveSummaryComponent,   // ProspectiveListingComponent,  // UserHistoryHeaderComponent, 
      resolve: { 
        summary: ProspectiveSummaryResolver,
    },
      data: {breadcrumb: {alias: 'Prospective Summary'}}},  
  
  {path: 'list/details', component: ProspectiveListComponent,   // ProspectiveListingComponent,  // UserHistoryHeaderComponent, 
      resolve: { 
        //prospectives: ProspectiveCandidatesAll,
        results: ContactResultResolver,
        //employeees: EmployeeIdsAndKnownAsResolver,
    },
      canDeactivate: [PreventUnsavedChangesForProspectsGuard],
      data: {breadcrumb: {alias: 'Prospective Candidates by CategoryRef'}}},  
  
  {path: 'prospectivelist/:categoryRef/:dated/:status', component: ProspectiveListComponent,
          resolve: { 
            //prospectives: ProspectiveCandidatesByCategoryRefResolver,
            results: ContactResultResolver,
            //employeees: EmployeeIdsAndKnownAsResolver,
        },
        canDeactivate: [PreventUnsavedChangesForProspectsGuard],
        data: {breadcrumb: {alias: 'Prospective Candidates by CategoryRef'}}},  

  {path: 'list/:id', component: ProspectiveListComponent, canActivate: [HrGuard],
    resolve: 
      { //prospectivePaging: ProspectiveCandidatesResolver,
        results: ContactResultResolver,
        employees: EmployeeIdsAndKnownAsResolver},
    data: {breadcrumb: {alias: 'Prospective candidates'}} },
  
  /* {path: '/:id', component: ProspectiveListingComponent, 
    resolve: 
      { 
        prospectiveListing: ProspectiveListingResolver,
        results: ContactResultsResolver,
        employees: EmployeeIdsAndKnownAsResolver},
    data: {breadcrumb: {alias: 'Prospective candidates'}} },
  */
  {path: 'historyfromprospective/:prospectiveId', component: CandidateHistoryComponent, 
      data: {breadcrumb: {alias: 'Prospective Candidate History'}}},
  
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
export class ProspectiveRoutingModule { }
