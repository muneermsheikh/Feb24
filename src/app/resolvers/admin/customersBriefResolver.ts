import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { ICustomerBriefDto } from "../../shared/dtos/admin/customerBriefDto";
import { IPagination } from "../../shared/models/pagination";
import { paramsCustomer } from "../../shared/params/admin/paramsCustomer";
import { CustomersService } from "../../shared/services/admin/customers.service";

 export const CustomersBriefResolver: ResolveFn<IPagination<ICustomerBriefDto[]>|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('custType');
    if(id===null) return of(null);
    if(!(id==='customer' || id==='associate' || id==='vendor')) return of(null);
        
    var params = new paramsCustomer();
    params.customerType=id;
    inject(CustomersService).setCustParams(params);
    return inject(CustomersService).getCustomers(false);
  };