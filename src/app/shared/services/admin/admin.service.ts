import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { IUser } from '../../models/admin/user';
import { ICustomerOfficialDto } from '../../models/admin/customerOfficialDto';
import { IOrderItemsAndAgentsToFwdDto } from '../../dtos/admin/orderItemsAndAgentsToFwdDto';
import { IEmployeeIdAndKnownAs } from '../../models/admin/employeeIdAndKnownAs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployeeIdAndKnownAs() {
    return this.http.get<IEmployeeIdAndKnownAs[]>(this.baseUrl + 'employees/idandknownas');
  }
  
  getUsersWithRoles() {
    //console.log('calling api for getuserswithroles');
    return this.http.get<IUser[] | undefined | null>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(email: string, roles: string[]) {
    //return this.http.post(this.baseUrl + 'admin/edit-roles/' + email + '?roles=' + roles, {});
    return this.http.post(this.baseUrl + 'admin/edit-roles/'+ email + '?roles=' + roles,{});
  }

  
  getIdentityRoles() {
    return this.http.get<string[]>(this.baseUrl + 'admin/identityroles');
  }

  getOfficialDto() {
    //return this.http.get<IChooseAgentDto[]>(this.baseUrl + 'customers/agentdetails');
    return this.http.get<ICustomerOfficialDto[]>(this.baseUrl + 'customers/agentdetails');
  }

  //forward DL to agents
  forwardDLtoSelectedAgents(itemsAndAgents: IOrderItemsAndAgentsToFwdDto) {
    return this.http.post(this.baseUrl + 'DLForward', itemsAndAgents )
  }

  addNewRole(newRoleName: string) {

    return this.http.post(this.baseUrl + 'admin/role/' + newRoleName, {});
  }

  deleteRole(roleName: string) {
    return this.http.delete(this.baseUrl + 'admin' + roleName);
  }

  editrRole(existingRoleName: string, newRoleName: string) {
    return this.http.put(this.baseUrl + 'role/' + existingRoleName + '/' + newRoleName, {});
  }
}
