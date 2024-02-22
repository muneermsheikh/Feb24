import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { of } from "rxjs";
import { IProfession } from "../../shared/models/masters/profession";
import { MastersService } from "../../shared/services/masters.service";

export const CategoryResolver: ResolveFn<IProfession | null> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('id');
    if (id===null) return of(null);
    return inject(MastersService).getCategory(+id!);
  };