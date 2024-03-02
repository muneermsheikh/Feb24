import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, tap } from 'rxjs';
import { ApplicationTaskInBrief, IApplicationTaskInBrief } from 'src/app/shared/models/admin/applicationTaskInBrief';
import { IUser } from 'src/app/shared/models/admin/user';
import { IPagination } from 'src/app/shared/models/pagination';
import { userTaskParams } from 'src/app/shared/params/admin/userTaskParams';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{

  routeId: string;
  user?: IUser;
  tasks: ApplicationTaskInBrief[]=[];
  cache = new Map();
  
  @ViewChild('search', {static: false}) searchTerm?: ElementRef;
  userTasks?: IApplicationTaskInBrief;
  oParams = new userTaskParams();
  pagination?: IPagination<ApplicationTaskInBrief>;  // = new PaginationTaskInBrief();
  totalCount: number=0;
  taskStatuses: string[] = ['not started', 'started', 'completed', 'canceled'];
  taskTypes: string[] = ['general', 'hr', 'admin', 'processing']
  
  isAddMode: boolean = false;
  loading = false;

  sortOptions = [
    {name:'By Task Date Asc', value:'taskdate'},
    {name:'By Task Date Desc', value:'taskdatedesc'},
    {name:'By Task status', value:'taskStatus'},
    {name:'By assigned to', value:'assignedTo'},
    {name:'By assigned to Desc', value:'assignedToDesc'},
    {name:'By Order No', value:'orderno'},
    {name:'By Order No Desc', value:'ordernodesc'},
  ]

  taskStatusOptions = [
    {name:'Open Tasks', value:'opentasks'},
    {name:'Completed Tasks', value:'completedtasks'},
    {name:'By Task status', value:'taskStatus'},
    {name:'Not Yet Started', value:'notstarted'},
    {name:'Canceled Tasks', value:'canceledtasks'},
  ]

  constructor(private activatedRoute: ActivatedRoute, 
      private router: Router,
      private accountService: AccountsService,
      private taskService: TaskService, 
      private toastr: ToastrService,
      private confirmService: ConfirmService) { 
    this.routeId = this.activatedRoute.snapshot.params['id'];
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user!);
  }

  ngOnInit(): void {
   this.activatedRoute.data.subscribe(data => {
      if(data['paginatedTask'] !==null) {
        this.tasks = data['paginatedTask'].data;
        this.totalCount = data['paginatedTask'].count;
      }
    }, error => {
      console.log(error);
    })
  }

  getTasks(userCache=false) {
    this.taskService.getTasks(userCache).subscribe((response:any) => {
      this.tasks = response.data;
      this.totalCount = response.count;
    })
  }

  onSearch() {
    const params = this.taskService.getOParams();
    params.search = this.searchTerm!.nativeElement.value;
    params.pageIndex = 1;
    this.taskService.setOParams(params);
    this.getTasks();
  }

  onReset() {
    this.searchTerm!.nativeElement.value = '';
    this.oParams = new userTaskParams();
    this.taskService.setOParams(this.oParams);
    this.getTasks();
  }
    
  onSortSelected(sortSelected: any) {
    console.log('on sort selected:', sortSelected);

    const prms = this.taskService.getOParams();
    prms.sort = sortSelected;
    prms.pageIndex=1;
    this.taskService.setOParams(prms);
    console.log('sort selected:', sortSelected);
    //this.getTasks();
  }
  
  onStatusSelected(statusSelected: any) {
    console.log('onStatusSelected:', statusSelected);

    const prms = this.taskService.getOParams();
    prms.taskStatus = statusSelected;
    prms.pageIndex=1;
    this.taskService.setOParams(prms);
    //this.getTasks();
    console.log('status selected:', statusSelected);
  }

  onPageChanged(event: any){
    const params = this.taskService.getOParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.taskService.setOParams(params);
      this.getTasks(true);
    }
  }

  setOParams(params: userTaskParams) {
    this.oParams = params;
  }
  
  getOParams() {
    return this.oParams;
  }

  completeTask(taskid: number)
  {
    this.confirmService.confirm('confirm you want to mark this task as COMPLETED', 'confirm Complete this task').subscribe(
      confirmed => {
        if(!confirmed) {
          this.toastr.info('Task Complete request canceled');
          return;
        } else {
          this.taskService.completeTask(taskid).subscribe(response => {
            --this.totalCount;
            this.removeTaskFromCache(taskid);
            this.toastr.success('Task set as COMPLETED');
          }, error => {
            this.toastr.error('Error: ', error);
          })
        }
      }
    );
  }

  deleteTaskR(taskid: number){
    this.confirmService.confirm('confirm delete this Task!', 'confirm delete').subscribe(
      confirmed => {
        if(!confirmed) {
          this.toastr.info('Delete request canceled');
          return;
        } else {
          this.taskService.deleteTask(taskid).subscribe(response => {
            --this.totalCount;
            this.removeTaskFromCache(taskid);
            this.toastr.success('Task deleted');

          }, error => {
            this.toastr.error('Error: ', error);
          })
        }
      }
    );

  }

  deleteTask(taskid: number) {
    this.confirmService.confirm('confirm delete this task', 'confirm delete task').pipe(
      switchMap(() => this.taskService.deleteTask(taskid).pipe(
        catchError(err => {
          console.log('Error in deleting the voucher', err);
          return of();
        }),
        tap(res => this.toastr.success('deleted task')),
        //tap(res=>console.log('delete voucher succeeded')),
      )),
      catchError(err => {
        this.toastr.error('Error in getting delete confirmation', err);
        return of();
      })
    ).subscribe(
      deleteReponse => {
        this.removeTaskFromCache(taskid);
        --this.totalCount;
        console.log('task deleted');
        this.toastr.success('Task deleted');
      },
      err => {
        console.log('any error NOT handed in catchError() or if throwError() is returned instead of of() inside catcherror()', err);
      }
    )
  }

  editTask(taskid: number) {
    let route ='/userTask/edit/' + taskid; 
    this.router.navigate([route], { state: { toedit: true, user: this.user, returnUrl: '/userTask' } });

  }
  removeTaskFromCache(taskid: number) {
    this.taskService.deleteTaskFromCache(taskid);
    var index=this.tasks.findIndex(x => x.id==taskid);
    this.tasks.splice(index,1);
    this.toastr.success('task deleted');

  }
}
