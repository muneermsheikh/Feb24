import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { ICustomerReview } from "../shared/models/admin/customerReview";
import { CustomerReviewService } from "../shared/services/admin/customer-review.service";

 export const CustomerReviewResolver: ResolveFn<ICustomerReview | null> = (
    route: ActivatedRouteSnapshot,
  ) => {

    var id = route.paramMap.get('id');
    if (id===null) return of(null);
    return inject(CustomerReviewService).getCustomerReview(+id!);
  };