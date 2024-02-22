import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { IProfession } from "../../shared/models/masters/profession";
import { MastersService } from "../../shared/services/masters.service";

export const CategoryListResolver: ResolveFn<IProfession[]> = (
  ) => {
    return inject(MastersService).getCategoryList();
  };