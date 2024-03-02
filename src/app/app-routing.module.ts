import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './accounts/log-in/log-in.component';
import { CandidateEditComponent } from './candidates/candidate-edit/candidate-edit.component';
import { CategoryListResolver } from './resolvers/admin/categoryListResolver';
import { CandidateResolver } from './resolvers/admin/candidateResolver';
import { QualificationListResolver } from './resolvers/qualificationListResolver';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: 'login', component: LogInComponent, data: {breadcrumb: 'LogIn'}},
  {path: 'register', component: CandidateEditComponent, 
    resolve: {
      categories: CategoryListResolver,
      qualifications: QualificationListResolver,
      //agents: AgentsResolver,
      candidate: CandidateResolver
    },
    data: {breadcrumb: 'Register'}},
    
  {path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule), data: {breadcrumb: {skip: true}}},

  {path: 'master values', loadChildren:() => import('./masters/masters.module').then(mod => mod.MastersModule), data: {breadcrumb: 'Master Values'}},
  
  {path: 'candidates', loadChildren:() => import('./candidates/candidate.module').then(mod => mod.CandidateModule), data: {breadcrumb: 'Candidates'}},
  
  {path: 'hr', loadChildren:() => import('./hr/hr.module').then(mod => mod.HrModule), data: {breadcrumb: 'HR'}},
  
  /* {path: 'candidatelist', component: CandidatesListingComponent, data: {breadcrumb: 'Candidate Listing'}}, */
  
  {path: 'orders', loadChildren:() => import('./orders/order.module').then(mod => mod.OrderModule), 
      data: {breadcrumb: 'orders'}},
  /* 
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'checkout'}},
  */
  
  {path: 'userTask', loadChildren: () => import('./userTasks/task.module').then(mod => mod.TaskModule), data: {breadcrumb: 'userTask'}},
  
  {path: 'admin', loadChildren:() => import('./admin/admin.module').then(mod => mod.AdminModule), 
    //canActivate: [AdminGuard], 
    data: {breadcrumb: 'Admin'}},
  
  {path: 'employments', loadChildren:() => import('./employmt/employmt.module').then(mod => mod.EmploymtModule),
    data: {breadcrumb: 'Employments'}},
  
  {path: 'callrecords', loadChildren:() => import('./callRecords/call-records.module').then(mod => mod.CallRecordsModule), 
    canActivate: [AdminGuard], 
    data: {breadcrumb: 'Call Records'}},
  /*
  {path: 'qualifications',component: QualificationsComponent, canActivate: [AuthorizedGuard], data: {breadcrumb: 'Qualifications'}}, 
  */
     
  {path: 'processing', loadChildren:() => import('./deploys/deploys.module').then(mod => mod.DeploysModule), 
      data: {breadcrumb: 'Deployment process'}},

  {path: 'prospectives', loadChildren:() => import('./prospectives/prospective.module').then(mod => mod.ProspectiveModule), 
      data: {breadcrumb: 'Prospective Candidates'}},
  
  
  {path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'not-found error'}},
  {path: 'messages', component: MessagesComponent, data: {breadcrumb: 'messages for loggedin user'}},

  {path: 'interviews', loadChildren:() => import('./interviews/interview.module').then(mod => mod.InterviewModule), data: {breadcrumb: 'Interviews'}},
  //{path: 'servererror',component: SeverErrorComponent},
  //{path: 'testerrors',component: TestErrorComponent},
  
  
  {path: 'finance', loadChildren:() => import('./finance/finance.module').then(mod => mod.FinanceModule) },
  
  {path: '**', redirectTo: '/notfound', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
