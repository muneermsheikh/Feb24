import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, tap } from 'rxjs';
import { EmploymentModalComponent } from 'src/app/admin/employment-modal/employment-modal.component';
import { IEmployment } from 'src/app/shared/models/admin/employment';
import { IUser } from 'src/app/shared/models/admin/user';
import { employmentParams } from 'src/app/shared/params/admin/employmentParam';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { EmploymentService } from 'src/app/shared/services/admin/employment.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-employmt-list',
  templateUrl: './employmt-list.component.html',
  styleUrls: ['./employmt-list.component.scss']
})
export class EmploymtListComponent implements OnInit {
  
  @ViewChild('search', {static: false}) searchTerm: ElementRef | undefined;
  employments: IEmployment[]=[];
  eParams = new employmentParams();
  totalCount: number=0;
  user?: IUser;

  bsModalRef: BsModalRef | undefined;


  sortOptions = [
    {name:'By Customer', value:'customer'},
    {name:'By Customer Desc', value:'customerdesc'},
    {name:'By Order No', value:'orderno'},
    {name:'By Order No Desc', value:'orderdesc'},
    {name:'By Category', value:'category'},
    {name:'By Category Desc', value:'categorydesc'},
    {name:'By Application No', value:'appno'},
    {name:'By Application No Desc', value:'appnodesc'},
    {name:'By Candidate Name', value:'candidatename'},
    {name:'By Candidate Name Desc', value:'candidatenamedesc'}
  ]

  employmentStatus = [
    {name: 'Approved', value: 'approved'},
    {name: 'Approval Pending', value: 'approvalpending'},
    {name: 'All Status', value: 'allstatus'}
  ]
  constructor(private service: EmploymentService
      , private activatedRoute: ActivatedRoute
      , private accountsService: AccountsService
      , private toastr: ToastrService
      , private confirmService: ConfirmService
      , private router: Router
      , private modalService: BsModalService) 
  {
        this.accountsService.currentUser$.pipe(take(1)).subscribe(user => this.user = user!);
  }

  ngOnInit(): void {
    this.getEmployments(false);
    console.log('employments;', this.employments);
  }

  getEmployments(useCache: boolean) {
    this.service.getEmployments(useCache).subscribe({
      next: response => {
        this.employments = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  deleteEmployment (id: number){
    this.confirmService.confirm('confirm delete this Employment record', 'confirm delete order').pipe(
      switchMap(confirmed => this.service.deleteEmployment(id).pipe(
        catchError(err => {
          console.log('Error in deleting the order', err);
          return of();
        }),
        tap(res => this.toastr.success('deleted Employment record')),
        //tap(res=>console.log('delete voucher succeeded')),
      )),
      catchError(err => {
        this.toastr.error('Error in getting delete confirmation', err);
        return of();
      })
    ).subscribe(
        () => {
          console.log('deete succeeded');
          this.toastr.success('order deleted');
        },
        (err: any) => {
          console.log('any error NOT handed in catchError() or if throwError() is returned instead of of() inside catcherror()', err);
      })
  }

  onSearch() {
    const params = this.service.getEParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.service.setEParams(params);
    this.getEmployments(true);
  }

  onReset() {
    this.searchTerm!.nativeElement.value = '';
    this.eParams = new employmentParams();
    this.service.setEParams(this.eParams);
    this.getEmployments(false);
  }

  onSortSelected(event: any) {
    var sort = event?.target.value;
    this.eParams.pageNumber=1;
    this.eParams.sort = sort;
    this.getEmployments(true);
  }

  onStatusSelected(event: any) {
    const params = this.service.getEParams();
    params.search = event;
    params.pageNumber = 1;
    this.service.setEParams(params);
    this.getEmployments(true);
  }
  
  onPageChanged(event: any){
    const params = this.service.getEParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.service.setEParams(params);
      this.getEmployments(true);
    }
  }

  openEditModal(emp: any) {

    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        emp : emp,
        title: 'test'
      }
    };

    this.bsModalRef = this.modalService.show(EmploymentModalComponent, config);

    
    this.bsModalRef.content.editEvent.pipe(
      switchMap((values: IEmployment) => this.service.updateEmployment(values).pipe(
        catchError(err => {
          console.log('Error in updating Employment Record', err);
          return of();
        }),
        tap(res => this.toastr.success('Employment Record updated')),
      )),
      catchError(err => {
        console.log(err);
        this.toastr.error('Error in getting updated object from Employment Edit Modal', err);
        return of();
      })
    ).subscribe( () => {
      this.toastr.success('Employment record updated');
      console.log()
    }),
    (err: any) => {
      console.log('unhandled error NOT handled in catch Error(, orif throwError()')
    }
 
  }

  editEmployment(employment: IEmployment) {
    
    const initialState = {
      class: 'modal-dialog-centered modal-lg',
       user: this.user,
       employment
    };
    this.bsModalRef = this.modalService.show(EmploymentModalComponent, {initialState});
    //**TODO** IMPLEMENT SWITCHMAP HERE, TO AVOID SUBSCRIPTION NESTING - CHECK implementation in referral edit */
    //this.bsModalRef.content.updateEmployment.subscribe((values: IEmployment) => {
      this.bsModalRef.content.editEvent.subscribe((values: IEmployment) => {
    this.service.updateEmployment(values).subscribe(() => {
      this.toastr.success("job description updated");
    }, error => {
      this.toastr.error("failed to update the job description");
    })
  })
    
  }
}