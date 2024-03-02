import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNamesComponent } from './user-names/user-names.component';
import { UserPhonesComponent } from './user-phones/user-phones.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { SharedModule } from '../shared/shared.module';
import { RolesComponent } from './roles/roles.component';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { UsersWithRolesComponent } from './users-with-roles/users-with-roles.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { UsersTransactionComponent } from './users-transaction/users-transaction.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserNamesComponent,
    UserPhonesComponent,
    LogInComponent,
    RegisterComponent,
    UserAddressComponent,
    RolesComponent,
    RolesModalComponent,
    UsersWithRolesComponent,
    UsersManagementComponent,
    UsersTransactionComponent,
    SearchHistoryComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class AccountsModule { }
