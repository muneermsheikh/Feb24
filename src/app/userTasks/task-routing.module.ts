import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { LoggedInUserTaskResolver } from '../resolvers/admin/loggedInUserTaskResolver';
import { EmployeeIdsAndKnownAsResolver } from '../resolvers/employeeIdsAndKnownAsResolver';
import { TaskTypeResolver } from '../resolvers/taskTypesResolver';
import { ContactResultResolver } from '../resolvers/admin/contactResultResolver';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserTaskFromIdResolver } from '../resolvers/userTaskFromIdResolver';

const routes = [
  {path: '', component: TaskListComponent, resolve: {
    paginatedTask: LoggedInUserTaskResolver}
  },
  {path: 'add', component: TaskEditComponent,
    resolve: {
      employees: EmployeeIdsAndKnownAsResolver,
      taskTypes: TaskTypeResolver,
      contactResult: ContactResultResolver
    },
    data: {breadcrumb: {alias: 'TaskAdd'}}},
  {path: 'edit/:id', component: TaskEditComponent, 
    resolve: {
      employees: EmployeeIdsAndKnownAsResolver,
      taskTypes: TaskTypeResolver,
      contactResult: ContactResultResolver,
      task: UserTaskFromIdResolver
    },
    data: {breadcrumb: {alias: 'TaskEdit'}}
  },
  
 /*
  {path: 'edittaskwithorderidandtasktype/:orderid/:tasktypeid', 
      resolve: {
        //task: TaskWithOrderIdAndTaskTypeResolver,
        employees: EmployeeIdsAndKnownAsResolver,
        taskTypes: TaskTypeResolver,
        contactResult: ContactResultsResolver
      },
      component: UserTaskEditComponent, data: {breadcrumb: {alias: 'TaskEdit'}}},
  
  {path: 'editwithobject', component: UserTaskEditComponent, data: {breadcrumb: {alias: 'TaskEdit'}}},
  {path: 'view/:id', component: UserTaskEditComponent , data: {breadcrumb: {alias: 'TaskView'}}},
  {path: 'viewbyresumeid/:resumeid', component: UserTaskEditComponent , data: {breadcrumb: {alias: 'TaskView'}}}
  */
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TaskRoutingModule { }
