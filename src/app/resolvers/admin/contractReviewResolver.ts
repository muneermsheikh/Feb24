import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { IContractReview } from "../../shared/models/admin/contractReview";
import { ReviewService } from "../../shared/services/admin/review.service";

 export const ContractReviewResolver: ResolveFn<IContractReview[]|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('id');
    if (id===null) return of(null);
    return inject(ReviewService).getReview(+id!);
  };