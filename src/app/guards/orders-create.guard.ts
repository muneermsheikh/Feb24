import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountsService } from '../shared/services/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersCreateGuard implements CanActivate {
  
  constructor(private accountService: AccountsService) { }
  
  canActivate(): Observable<boolean|false> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user?.roles?.includes('OrderCreate') ) {
          return true;
        } else{
          return false;
        }
      })
    )
  }
  
}
