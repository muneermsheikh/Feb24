import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { UserTaskResolver } from '../resolvers/userTaskResolver';
import { EmployeeIdsAndKnownAsResolver } from '../resolvers/employeeIdsAndKnownAsResolver';
import { TaskTypeResolver } from '../resolvers/contactResultResolver';
import { ContactResultsResolver } from '../resolvers/contactResultsResolver';


const routes = [
  {path: '', component: TaskListComponent, resolve: {paginatedTask: UserTaskResolver}},
  /*{path: 'add', component: UserTaskEditComponent,
    resolve: {
      employees: EmployeeIdsAndKnownAsResolver,
      taskTypes: TaskTypeResolver,
      contactResult: ContactResultsResolver
    },
    data: {breadcrumb: {alias: 'TaskAdd'}}},
    */
   /*
  {path: 'edit/:id', component: UserTaskEditComponent, 
    resolve: {
      employees: EmployeeIdsAndKnownAsResolver,
      taskTypes: TaskTypeResolver,
      contactResult: ContactResultsResolver,
      task: UserTaskFromIdResolver
    },
    data: {breadcrumb: {alias: 'TaskEdit'}}
  },
  */
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
  ]
})
export class TaskRoutingModule { }
