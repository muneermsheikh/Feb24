import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { IQualification } from "../shared/models/hr/qualification";
import { MastersService } from "../shared/services/masters.service";

export const qualifictionListResolver: ResolveFn<IQualification[] | undefined | null> = (
  ) => {
        return inject(MastersService).getQualificationList();
  };