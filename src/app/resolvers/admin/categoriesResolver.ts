import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { IPagination } from "../../shared/models/pagination";
import { IProfession } from "../../shared/models/masters/profession";
import { MastersService } from "../../shared/services/masters.service";

 
export const CategoriesResolver: ResolveFn<IPagination<IProfession[]> | undefined> = (
  ) => {
      return inject(MastersService).getCategories(false);
  };