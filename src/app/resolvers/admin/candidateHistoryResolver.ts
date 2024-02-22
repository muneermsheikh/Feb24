import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { IUserHistory } from "../../shared/models/admin/userHistory";
import { userHistoryParams } from "../../shared/params/admin/userHistoryParams";
import { CandidateHistoryService } from "../../shared/services/candidate-history.service";

export const CandidateAssessedResolver: ResolveFn<IUserHistory|null> = (
    route: ActivatedRouteSnapshot,
  ) => {
        var hParam = new userHistoryParams();
        var routeid = route.paramMap.get('id');
        if ( routeid!=='' && routeid !== null && routeid !== '0') {
            hParam.personType='prospective';
            hParam.id = +routeid;
        } else {
            if (routeid !== '' && routeid !== '0' && routeid !== null) {
                hParam.personType='prospective';
                hParam.id=+routeid;
            } else {
                var officialId = route.paramMap.get('officialId');
                if(officialId !== null) {
                    hParam.personType='official';
                    hParam.personId = +officialId;
                } else {
                    return of(null);
                }
            }
        }
    
        return inject(CandidateHistoryService).getHistory(hParam);
  };