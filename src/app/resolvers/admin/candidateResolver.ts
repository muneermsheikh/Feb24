import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { ICandidate } from "../../shared/models/hr/candidate";
import { CandidateService } from "../../shared/services/candidate.service";
 
export const CandidateResolver: ResolveFn<ICandidate|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('id');
    if (id===null) return of(null);
    return inject(CandidateService).getCandidate(+id!);
  };