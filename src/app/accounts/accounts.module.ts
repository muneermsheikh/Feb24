import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNamesComponent } from './user-names/user-names.component';
import { UserPhonesComponent } from './user-phones/user-phones.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserNamesComponent,
    UserPhonesComponent,
    LogInComponent,
    RegisterComponent,
    UserAddressComponent

  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AccountsModule { }
