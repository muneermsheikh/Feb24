import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ICOA } from "src/app/shared/models/finance/coa";
import { COAService } from "src/app/shared/services/finance/coa.service";

export const COAListResolver: ResolveFn<ICOA[]|null> = (
	
  ) => {
	return inject(COAService).getCoaList();
  };