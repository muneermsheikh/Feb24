import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountsService } from '../shared/services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FinanceGuard implements CanActivate {
  
  constructor(private accountsService: AccountsService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean|false> {
    return this.accountsService.currentUser$.pipe(
      map(user => {
        if(user?.roles?.includes('Finance')) {
          return true;
        } else {
          this.toastr.error('Unauthorized');  
          return false;
        }
      })
    )

  }
}
