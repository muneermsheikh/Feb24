import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { IForwardedCategoryDto } from "../../shared/dtos/admin/forwardedCategoryDto";
import { DlForwardService } from "../../shared/services/admin/dl-forward.service";

 export const AssociateForwardsForADLResolver: ResolveFn<IForwardedCategoryDto[]|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('orderid');
    if (id===null) return of(null);
    return inject(DlForwardService).getAssociatesForwardedForADL(+id!);
  };