import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IClientIdAndNameDto } from '../../shared/dtos/admin/clientIdAndNameDto';
import { CustomersService } from 'src/app/shared/services/admin/customers.service';

export const AgentsResolver: ResolveFn<IClientIdAndNameDto[]|null> = (
) => {
  return inject(CustomersService).getAgentIdAndNames();
};
