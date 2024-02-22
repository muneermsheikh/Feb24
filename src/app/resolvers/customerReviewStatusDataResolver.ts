import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ICustomerReviewData } from "../shared/models/admin/customerReviewData";

export const CustomerReviewStatusDataResolver: ResolveFn<ICustomerReviewData[]|null> = (
  ) => {
    return inject(ClientReviewService).getCustomerReviewStatusData();
  };