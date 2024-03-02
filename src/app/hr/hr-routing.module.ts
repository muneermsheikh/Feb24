import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { AssessStddComponent } from './assess-stdd/assess-stdd.component';
import { AssessmentStddQsResolver } from '../resolvers/hr/assessmentStddQsResolver';
import { StddQEditComponent } from './stdd-q-edit/stdd-q-edit.component';
import { AssessmentStddQResolver } from '../resolvers/hr/assessmentStddQResolver';
import { HrChecklistComponent } from './hr-checklist/hr-checklist.component';
import { AssessQbankComponent } from './assess-qbank/assess-qbank.component';
import { AssessmentQBankResolver } from '../resolvers/hr/assessmentQBankResolver';
import { CategoryListResolver } from '../resolvers/admin/categoryListResolver';
import { AssessComponent } from './assess/assess.component';
import { AssessQComponent } from './assess-q/assess-q.component';
import { OrderItemBriefResolver } from '../resolvers/orderItemBriefResolver';
import { AssessmentQsResolver } from '../resolvers/hr/assessmentQsResolver';
import { CvAssessComponent } from './cv-assess/cv-assess.component';
import { CandidateBriefResolver } from '../resolvers/admin/candidatesBriefResolver';
import { OpenOrderItemsResolver } from '../resolvers/openOrderItemsResolver';
import { CvrefComponent } from '../admin/cvref/cvref.component';
import { AssessedAndApprovedCVsResolver } from '../resolvers/hr/assessedAndApprovedCVsResolver';
import { InterviewListComponent } from '../interviews/interview-list/interview-list.component';
import { InterviewsBriefResolver } from '../resolvers/hr/interviewsBriefResolver';
import { InterviewIndexComponent } from '../interviews/interview-index/interview-index.component';
import { OrderBriefResolver } from '../resolvers/orderBriefResolver';
import { AssessmentQsOfOrderIdResolver } from '../resolvers/hr/assessmentQsOfOrderIdResolver';

const routes = [
  {path: '', component: HrIndexComponent,  data: {breadcrumb: 'HR Division'}},
  
  {path: 'stddqs', component: AssessStddComponent,
    resolve: { stddqs: AssessmentStddQsResolver },
    data: {breadcrumb: {breadcrumb: 'Standard Assessment Questions'}}
  },
  
  {path: 'editstdd/:id', component: StddQEditComponent,
    resolve: {stddq: AssessmentStddQResolver}
  },

  {path: 'checklist', component: HrChecklistComponent,
    resolve: {
      //stddqs: AssessmentStddQsResolver
    }},
    {path: 'qs', component: AssessQbankComponent,
    resolve: {
      qs: AssessmentQBankResolver,
      categories: CategoryListResolver
    }},

    {path: 'orderassess/:orderid', component: AssessComponent,
    resolve: {
      order: OrderBriefResolver,
      assessmentItems: AssessmentQsOfOrderIdResolver
    }},
    
    {path: 'itemassess/:id', component: AssessQComponent,
    resolve: {
      itembrief: OrderItemBriefResolver,
      assessment: AssessmentQsResolver
    }}, 
    
    {path: 'cvassess/:id', component: CvAssessComponent,
      //canDeactivate: [PreventUnsavedChangesGuard],
    resolve: {
      candidateBrief: CandidateBriefResolver,
      openOrderItemsBrief: OpenOrderItemsResolver
    }},

    {path: 'cvforward', component: CvrefComponent,
    //canDeactivate: [PreventUnsavedChangesGuard],
    resolve: {assessedcvs: AssessedAndApprovedCVsResolver}},

    {path: 'interviews', component: InterviewListComponent,
    //canDeactivate: [PreventUnsavedChangesGuard],
    resolve: {interviews: InterviewsBriefResolver}},
    
    {path: 'interviewindex', component: InterviewIndexComponent}
    
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
export class HrRoutingModule { }
