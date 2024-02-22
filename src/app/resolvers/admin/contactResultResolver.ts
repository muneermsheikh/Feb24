import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { TaskService } from "../../shared/services/task.service";
import { IContactResult } from "../../shared/models/admin/contactResult";

export const ContactResultResolver: ResolveFn<IContactResult[]|null> = (
  ) => {
    return inject(TaskService).getContactResults();
  };