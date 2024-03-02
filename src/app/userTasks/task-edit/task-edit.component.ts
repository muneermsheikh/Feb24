import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { IApplicationTask } from 'src/app/shared/models/admin/applicationTask';
import { IEmployeeIdAndKnownAs } from 'src/app/shared/models/admin/employeeIdAndKnownAs';
import { ITaskItem } from 'src/app/shared/models/admin/taskItem';
import { IUser } from 'src/app/shared/models/admin/user';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { UserTaskService } from 'src/app/shared/services/admin/user-task.service';

import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit{
  
  @ViewChild('editForm') editForm?: NgForm;

  routeId: string;

  task?: IApplicationTask;
  user?: IUser;
  
  form: FormGroup=new FormGroup({});
  selectedCategoryIds: number[]=[];
  employees: IEmployeeIdAndKnownAs[]=[];
  
  events: Event[] = [];

  isAddMode: boolean=false;
  loading = false;
  submitted = false;

  errors: string[]=[];

  bsValue = new Date();
  bsRangeValue?: Date[];
  maxDate = new Date();
  minDate = new Date();

  bsValueDate = new Date();
  //bsModalRef: BsModalRef;

  taskItem?: ITaskItem;
  
  taskStatus= [
    {'id': 0, statusName: 'Not Started'}, 
    {'id': 1, statusName: 'In Progress'}, 
    {'id': 2, statusName: 'Completed'}, 
    {'id': 3, statusName: 'Canceled'}
  ]

  constructor(
      private service: UserTaskService, 
      private adminService: AdminService,
      private bcService: BreadcrumbService, 
      //private modalService: BsModalService,
      private activatedRoute: ActivatedRoute, 
      private router: Router, 
      //private rvwService: ReviewService,
      private accountService: AccountsService, 
      //private confirmService: ConfirmService,
      private toastr: ToastrService, 
      private fb: FormBuilder) {
    this.bcService.set('@userTask',' ');
    this.routeId = this.activatedRoute.snapshot.params['id'];
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user!);
    //this.maxDate.setFullYear(this.maxDate.getFullYear() - 1);  //10 years later
    //this.minDate.setFullYear(this.minDate.getFullYear() + 20);
    //this.bsRangeValue = [this.bsValue, this.maxDate];
   }

  ngOnInit(): void {
      //this.routeId = this.activatedRoute.snapshot.params['id'];
      this.isAddMode = !this.routeId;
      this.getEmployeeIdAndKnownAs();
      this.createForm();

      if (!this.isAddMode) {
        this.getTask(+this.routeId);
    }
  
  }

  getEmployeeIdAndKnownAs() {
    return this.adminService.getEmployeeIdAndKnownAs().subscribe((response: IEmployeeIdAndKnownAs[]) => {
      this.employees = response;
    })
  }

  getTask(id: number) {
    this.service.getTask(id).subscribe( 
      response => {
        this.task = response;
        this.editTask(this.task);
      }
    )
  }
  
  createForm() {
      this.form = this.fb.group({
        id: [null],  taskTypeId: 0, taskDate: ['', Validators.required],
        taskOwnerId: [0, Validators.required], assignedToId: [0, Validators.required], 
        taskDescription: ['', Validators.required], completeBy: ['', Validators.required],
        taskStatus: ['', Validators.required], completedOn: '',
        postTaskAction: 0, taskItems: this.fb.array([])
      } 
      );

      if (!this.isAddMode) this.loadTask();
    }

    editTask(task: IApplicationTask) {
      this.form.patchValue( {
        id: task.id, taskTypeId: task.taskTypeId, taskDate: task.taskDate, 
        taskOwnerId: task.taskOwnerId, assignedToId: task.assignedToId,
        taskDescription: task.taskDescription, completeBy: task.completeBy,
        taskStatus: task.taskStatus, completedOn: task.completedOn,
        postTaskAction: task.postTaskAction, orderId: task.orderId,
        orderNo: task.orderNo, orderItemId: task.orderItemId,
        applicationNo: task.applicationNo, candidateId: task.candidateId
      });

      if (task.taskItems != null) this.form.setControl('taskItems', this.setExistingItems(task.taskItems));
    }

    
    setExistingItems(items: ITaskItem[]) {

        items.forEach(ph => {
          var taskitem = this.fb.group({
            id: ph.id, applicationTaskId: ph.applicationTaskId, 
            transactionDate: ph.transactionDate,
            taskTypeId: ph.taskTypeId, taskStatus: ph.taskStatus, 
            taskItemDescription: ph.taskItemDescription, employeeId: ph.employeeId, 
            orderId: ph.orderId, orderNo: ph.orderNo, candidateId: ph.candidateId,
            userId: ph.userId, quantity: ph.quantity, nextFollowupOn: ph.nextFollowupOn,
            nextFollowupById: ph.nextFollowupById
          })
          this.taskItems.push(taskitem);
        });
    }

    
      get taskItems() : FormArray {
        return this.form.get("taskItems") as FormArray
      }

      newItem(): FormGroup {
        return this.fb.group({
          id: 0, applicationTaskId: 0, transactionDate: '',
          taskTypeId: 0, taskStatus: '', taskItemDescription: '',
          emploeeId: 0, orderId: 0, orderNo: 0, candidateId: 0,
          userId: 0, quantity: 0, nextFollowupOn: '', nextFollowupById: 0
      })
      }

      addItem() {
        this.taskItems.push(this.newItem());
      }

      removeItem(i:number) {
        this.taskItems.removeAt(i);
        this.taskItems.markAsDirty();
        this.taskItems.markAsTouched();
      }

      
      loadTask() {
        this.service.getTask(+this.routeId).subscribe(
          response => {
              this.task = response;  
              this.form.patchValue(this.task);
              if(this.task.taskItems != null) {
                for(const p of this.task.taskItems) {
                  this.taskItems.push(new FormControl(p));}
              }
            }
        )} 

      onSubmit() {
        if (+this.routeId ===0) {
          this.CreateTask();
        } else {
          this.toastr.warning('updating task ...');
          this.UpdateTask();
        }
      }

      private CreateTask() {
        this.service.CreateNewTask(this.form.value).subscribe(response => {
          var order = response;
        }, error => {
          console.log(error);
          this.errors = error.errors;
        })
      }

      private UpdateTask() {
        this.service.UpdateTask(this.form.value).subscribe(response => {
          this.toastr.success('Task updated');
          this.router.navigateByUrl('/userTask');

        }, error => {
          console.log(error);
        })
      }

      getName(i:number) {
        return this.getControls()[i].value.id;
      }
    
      getControls() {
        return (<FormArray>this.form.get('taskItems')).controls;
      }

      getTaskItem(taskitemid:number) {
        return this.service.getTaskItem(taskitemid).subscribe(response => {
          this.taskItem = response;
        }, error => {
          this.toastr.error('failed to retrieve task items');
        })
      }
}
