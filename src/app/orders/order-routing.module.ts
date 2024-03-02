import { NgModule } from '@angular/core';
import { OrderIndexComponent } from './order-index/order-index.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderResolver } from '../resolvers/orderResolver';
import { AgentsResolver } from '../resolvers/admin/agents.resolver';
import { CategoryListResolver } from '../resolvers/admin/categoryListResolver';
import { CustomerOfficialsResolver } from '../resolvers/admin/customerOfficialsResolver';
import { EmployeeIdsAndKnownAsResolver } from '../resolvers/employeeIdsAndKnownAsResolver';
import { CustomerNameCityResolver } from '../resolvers/admin/customerNameCityResolver';
import { AssessQComponent } from '../hr/assess-q/assess-q.component';
import { HrGuard } from '../guards/hr.guard';
import { OrderItemBriefResolver } from '../resolvers/orderItemBriefResolver';
import { AssessmentQsResolver } from '../resolvers/hr/assessmentQsResolver';
import { OrderForwardComponent } from './order-forward/order-forward.component';
import { DLForwardsOfAnOrderIdResolver } from '../resolvers/admin/dlForwardsOfAnOrderIdResolver';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: OrderIndexComponent,  data: {breadcrumb: 'Admin Division'}},

  {path: 'edit/:id', component: OrderEditComponent,
    resolve: 
      {
        order: OrderResolver,
        agents: AgentsResolver,
        professions: CategoryListResolver,
        associates: CustomerOfficialsResolver,
        employees: EmployeeIdsAndKnownAsResolver,
        customers: CustomerNameCityResolver,
      },
      
      data: {breadcrumb: {alias: 'OrderEdit'}}
  },

  {path: 'add', component:OrderEditComponent , 
    //canActivate: [OrdersCreateGuard],
  resolve: {
      professions: CategoryListResolver,
      employees: EmployeeIdsAndKnownAsResolver,
      customers: CustomerNameCityResolver,
    },
    data: {breadcrumb: {alias: 'OrderAdd'}}},

  {path: 'view/:id', component: OrderEditComponent , data: {breadcrumb: {alias: 'OrderView'}}},

  {path: 'itemassess/:id', component: AssessQComponent,
    canActivate: [HrGuard],
    resolve: {
      itembrief: OrderItemBriefResolver,
      assessment: AssessmentQsResolver
  }},

    {path: 'forwards/:orderid', component: OrderForwardComponent,
    data: {breadcrumb: {alias: 'DL Forwards'}},
    resolve: {
      dlforwarddata: DLForwardsOfAnOrderIdResolver }
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
export class OrderRoutingModule { }
