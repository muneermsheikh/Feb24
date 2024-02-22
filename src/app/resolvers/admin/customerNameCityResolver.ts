import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ICustomerNameAndCity } from "../../shared/models/admin/customernameandcity";
import { ClientService } from "../../shared/services/admin/client.service";


 export const CustomerNameCityResolver: ResolveFn<ICustomerNameAndCity[]|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
     return inject(ClientService).getCustomerAndCities();
  };