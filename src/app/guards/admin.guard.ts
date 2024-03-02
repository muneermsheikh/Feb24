import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountsService } from '../shared/services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private accountService: AccountsService, private toastr: ToastrService) { }
  
  canActivate(): Observable<boolean|false> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user?.roles?.includes('Admin') || user?.roles?.includes('HRManager')) {
          return true;
        } else {
          this.toastr.error('Unauthorizzed');
          return false;
        }
        
      })
    )
  }
  
}
