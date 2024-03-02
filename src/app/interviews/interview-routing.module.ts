import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewIndexComponent } from './interview-index/interview-index.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewAddComponent } from './interview-add/interview-add.component';
import { InterviewResolver } from '../resolvers/interviewResolver';
import { EmployeeIdsAndKnownAsResolver } from '../resolvers/employeeIdsAndKnownAsResolver';
import { InterviewEditComponent } from './interview-edit/interview-edit.component';
import { InterviewFromOrderNoResolver } from '../resolvers/hr/interviewsFromInterviewNoResolver';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: InterviewIndexComponent},  
  
  {path: 'list', component: InterviewListComponent,
      //resolve: {interviews: InterviewsBriefResolver}
  },
  {path: 'edit/:orderid', component: InterviewAddComponent,
      resolve: {
      interview: InterviewResolver,
      employees: EmployeeIdsAndKnownAsResolver
    },
    data: {breadcrumb: {alias: 'OrderEdit'}}
  },
  {path: 'editinterview/:orderno', component: InterviewEditComponent,
      resolve: {
      interview: InterviewFromOrderNoResolver,
      employees: EmployeeIdsAndKnownAsResolver
    },
    data: {breadcrumb: {alias: 'OrderEdit'}}
  },
  
  {path: 'add', component: InterviewAddComponent}
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
export class InterviewRoutingModule { }
