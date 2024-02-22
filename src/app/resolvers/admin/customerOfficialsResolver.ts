import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ICustomerOfficialDto } from "../../shared/models/admin/customerOfficialDto";
import { ClientService } from "../../shared/services/admin/client.service";


export const CustomerOfficialsResolver: ResolveFn<ICustomerOfficialDto[]|null> = (
  ) => {
    return inject(ClientService).getAgents();
  };