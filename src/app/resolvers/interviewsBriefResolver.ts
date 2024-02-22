import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { IPagination } from "../shared/models/pagination";
import { IInterview } from "../shared/models/hr/interview";
import { InterviewService } from "../shared/services/hr/interview.service";

 export const CustomerReviewResolver: ResolveFn<IPagination<IInterview[]> | null | undefined> = (
  ) => {
     return inject(InterviewService).getInterviews(false);
  };