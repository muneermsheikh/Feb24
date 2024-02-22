import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { ICustomerReview } from "../shared/models/admin/customerReview";

 export const CustomerReviewResolver: ResolveFn<ICustomerReview> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('id');
    if (id===null) return of(null);
    return inject(CuReviewService).getCustomerReview(+id!);
  };