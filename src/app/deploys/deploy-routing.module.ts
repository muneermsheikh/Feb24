import { NgModule } from '@angular/core';
import { DeployIndexComponent } from './deploy-index/deploy-index.component';
import { DeployListComponent } from './deploy-list/deploy-list.component';
import { DeployEditComponent } from './deploy-edit/deploy-edit.component';
import { CVsRefWithDeploysResolver } from '../resolvers/admin/cvsRefWithDeploysResolver';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: DeployIndexComponent},
  {path: 'list', component: DeployListComponent},

  {path: 'list/:orderid', component: DeployListComponent},
  {path: 'edit/:cvrefid', component: DeployEditComponent,
    resolve: {
      deployment: CVsRefWithDeploysResolver,
      //depStatuses: DeploymentStatusResolver
    }}
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
export class DeployRoutingModule { }
