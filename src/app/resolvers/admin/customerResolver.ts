import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { ICustomer } from "../../shared/models/admin/customer";
import { CustomersService } from "../../shared/services/admin/customers.service";
 
export const CustomerResolver: ResolveFn<ICustomer|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('id');
    if(id===null || id==='') return of(null);
    
    return inject(CustomersService).getCustomer(+id!);
  };