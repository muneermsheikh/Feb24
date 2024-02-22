import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ICandidateBriefDto } from "../../shared/dtos/admin/candidateBriefDto";
import { IPagination } from "../../shared/models/pagination";
import { CandidateService } from "../../shared/services/candidate.service";


export const CandidateBriefResolver: ResolveFn<IPagination<ICandidateBriefDto[]>> = (
  ) => {
    return inject(CandidateService).getCandidates(false);
  };