import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApplicationTask, IApplicationTask } from 'src/app/shared/models/admin/applicationTask';
import { IEmployeeIdAndKnownAs } from 'src/app/shared/models/admin/employeeIdAndKnownAs';
import { IUser } from 'src/app/shared/models/admin/user';
import { UserTaskService } from 'src/app/shared/services/admin/user-task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() updatedRemidner = new EventEmitter();
  objs: IApplicationTask[]=[];
  emps: IEmployeeIdAndKnownAs[]=[];
  title: string='';
  user?: IUser;
  
  constructor(public bsModalRef: BsModalRef, private toastr: ToastrService, 
    public modalService: BsModalService, private userTaskService: UserTaskService) { }

  ngOnInit(): void {
    
  }

  createNewTask() {
    
  }

  
  async displayModalReminder(event: any) {

    var historyItemId = event.controls['id'].value;

    var obj = await this.createNewTaskObject(historyItemId);
    
      const config = {
        title: 'create task for ' ,
        class: 'modal-dialog-centered modal-lg',
        initialState: {
          obj, 
          emps: this.emps
        }
      }
      
      this.bsModalRef = this.modalService.show(TaskModalComponent, config);
      var returnedTask: IApplicationTask;
      this.bsModalRef.content.updatedRemidner.subscribe((values: any) => {
          returnedTask = values;
          if(returnedTask ===undefined || returnedTask === null ) {
            this.toastr.warning('task creation canceled');
            return;
          }
          this.userTaskService.createTaskFromAppTask(returnedTask).subscribe(response => {
            if (response) this.toastr.success('task created');
            }, error => {
              this.toastr.warning('failed to create the task');
              console.log(error);
            })
      }, (error: any) => {
        this.toastr.warning('failed to create the task', error);
      })

  }


    async createNewTaskObject(historyItemId: number): Promise<IApplicationTask> {
      var task: IApplicationTask = new ApplicationTask();
    
      const dt= new Date().toISOString();
      const dt1 = new Date(dt);
      var loggedinEmployeeId = this.user?.loggedInEmployeeId;     //why is this.user.loggedInEmployeeId undefined?
      if(loggedinEmployeeId === 0 || loggedinEmployeeId === undefined) {
        return task;
      }

      task.id=0;
      task.taskTypeId = 20, //obj.taskTypeName ='none',
      task.taskDate = new Date(); //obj.assignedToId=,  //obj.assignedToName='', 
      task.completeBy=new Date(dt1.setDate(dt1.getDate()+ 7));
      task.taskStatus='not started';
      task.taskDescription='reminder for ';
      //obj.taskOwnerName=this.user.displayName;
      task.taskOwnerId=loggedinEmployeeId; 
      task.historyItemId=historyItemId;

      return task;

    };

}
