import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AdminGuard } from '../guards/admin.guard';
import { RolesComponent } from './roles/roles.component';
import { UsersTransactionComponent } from './users-transaction/users-transaction.component';
import { RolesResolver } from '../resolvers/identity/roles.resolver';

const routes: Routes = [
  {path: '', component: LogInComponent,  data: {breadcrumb: 'Login Admin'}},
  {path: 'login', component: LogInComponent,data: {breadcrumb: {alias: 'logIn'}}},
  {path: 'register', component: RegisterComponent,data: {breadcrumb: {alias: 'registerUser'}}},
  {path: 'userswithroles', component: UsersManagementComponent, 
    //canActivate: [AdminGuard], 
    data: {breadcrumb: {alias: 'User Role Management'}}
  },

  {path: 'identityRoles', 
    resolve:{roles: RolesResolver},
    component: RolesComponent, 
    //canActivate: [AdminGuard], 
    data: {breadcrumb: {alias: 'Identity Roles'}}
  },
  
  {path: 'transactions', component: UsersTransactionComponent, data: {breadcrumb: {alias: 'Transactions'}}}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AccountRoutingModule { }
