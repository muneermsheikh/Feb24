import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CvrefComponent } from './cvref/cvref.component';
import { CategoryListResolver } from '../resolvers/admin/categoryListResolver';
import { AgentsResolver } from '../resolvers/admin/agents.resolver';
import { CvreferredComponent } from './cvreferred/cvreferred.component';
import { CVsReferredResolver } from '../resolvers/admin/cvsReferredResolver';
import { SelectionComponent } from './selection/selection.component';
import { SelectionsGuard } from '../guards/selections.guard';
import { PendingSelectionsResolver } from '../resolvers/pendingSelectionsResolver';
import { SelectionStatusResolver } from '../resolvers/selectionStatusResolver';
import { MessagesComponent } from './messages/messages.component';
import { DlForwardComponent } from './dl-forward/dl-forward.component';
import { AssociateForwardsForADLResolver } from '../resolvers/admin/associateForwardsForADLResolver';
import { CategoriesComponent } from '../masters/categories/categories.component';
import { QualificationsComponent } from '../masters/qualifications/qualifications.component';
import { QualificationsResolver } from '../resolvers/qualificationsResolver';
import { IndustryTypesComponent } from '../masters/industry-types/industry-types.component';
import { RouterModule } from '@angular/router';
import { EmploymentsResolver } from '../resolvers/employmentsResolver';
import { EmploymtListComponent } from '../employmt/employmt-list/employmt-list.component';
import { RolesComponent } from '../accounts/roles/roles.component';
import { OrderIndexComponent } from '../orders/order-index/order-index.component';

const routes = [
  {path: '', component: AdminIndexComponent,  data: {breadcrumb: 'Admin Division'}},
  {path: 'roles', component: RolesComponent},
  {path: 'orders', component: OrderIndexComponent },
  
  {path: 'cvforward', component: CvrefComponent,
    resolve: 
      {
        //assessedcvs: AssessedAndApprovedCVsResolver,
        professions: CategoryListResolver,
        agents: AgentsResolver
      },
    data: {breadcrumb: {breadcrumb: 'CV Forward to clients'}}
  },
  
  {path: 'cvreferred/:orderid', component: CvreferredComponent,
  resolve: 
      {
        referredcvs: CVsReferredResolver
      },
    data: {breadcrumb: {breadcrumb: 'CVs Referred to clients'}}
  },

  {path: 'selections', component: SelectionComponent, canActivate: [SelectionsGuard], 
    data: {breadcrumb: 'Selections'},
    resolve: {
      selectionsPending: PendingSelectionsResolver
      , selectionStatus: SelectionStatusResolver
    }
  },
  
   {path: 'employments', component: EmploymtListComponent
      //, canActivate: [SelectionsGuard]
      , resolve: {employments: EmploymentsResolver },
      data: {breadcrumb: 'Employments'}
    },
  
  {path: 'messages', component: MessagesComponent, canActivate: [SelectionsGuard], data: {breadcrumb: 'Email Messages'}},
  
  {path: 'forwarded/:orderid', component: DlForwardComponent, canActivate: [SelectionsGuard], data: {breadcrumb: 'DL Forwards to Agents'},
    resolve: {forwards: AssociateForwardsForADLResolver}  
  },
  {path: 'categories', component: CategoriesComponent, 
      canActivate: [SelectionsGuard], data: {breadcrumb: 'Categories'},
  //resolve: {cats: CategoriesResolver}  
  },
  {path: 'qualifications', component: QualificationsComponent, 
      //canActivate: [SelectionsGuard], 
      data: {breadcrumb: 'Qualificaions'},
      resolve: {quals: QualificationsResolver
      }  
  },
  
  {path: 'IndustryTypes', component:IndustryTypesComponent , data: {breadcrumb: {alias: 'Industry Types'}}},
  
  {path: 'pendingselections', component: SelectionComponent, 
      canActivate: [SelectionsGuard], 
      data: {breadcrumb: 'Selections'}
      , resolve: {
        selectionsPending: PendingSelectionsResolver,
        selectionStatus: SelectionStatusResolver
      }  
  }
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
export class AdminRoutingModule { }
