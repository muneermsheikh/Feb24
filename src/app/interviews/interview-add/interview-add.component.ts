import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { IEmployeeIdAndKnownAs } from 'src/app/shared/models/admin/employeeIdAndKnownAs';
import { IUser } from 'src/app/shared/models/admin/user';
import { IInterview } from 'src/app/shared/models/hr/interview';
import { IInterviewItem } from 'src/app/shared/models/hr/interviewItem';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { InterviewService } from 'src/app/shared/services/hr/interview.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-interview-add',
  templateUrl: './interview-add.component.html',
  styleUrls: ['./interview-add.component.scss']
})
export class InterviewAddComponent implements OnInit {
  
  interview?: IInterview;
  employees?: IEmployeeIdAndKnownAs[];
  //routeId: string;

  errors: string[] = [];
  
  isAddMode: boolean = false;
  bsValue = new Date();
  bsRangeValue: Date[]=[];
  maxDate = new Date();
  minDate = new Date();

  loading: boolean = false;

  user?: IUser;
  
  form: FormGroup = new FormGroup({});


  constructor(private service: InterviewService, private bcService: BreadcrumbService,
      private activatedRoute: ActivatedRoute, 
      private router: Router, 
      private accountService: AccountsService, 
      private confirmService: ConfirmService,
      private toastr: ToastrService, 
      private fb: FormBuilder) 
      {
        this.bcService.set('@orderDetail',' ');
        //this.routeId = this.activatedRoute.snapshot.params['id'];
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user!);
        //this.maxDate.setFullYear(this.maxDate.getFullYear() - 1);  //10 years later
        //this.minDate.setFullYear(this.minDate.getFullYear() + 20);
        //this.bsRangeValue = [this.bsValue, this.maxDate];
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.data.subscribe(data => {
      this.interview=data['interview'];
      this.employees = data['employees'];
      this.isAddMode = this.interview !== null && this.interview?.id ===0;
       this.interview===null;
      
        this.populateForm(this.interview!);
      })
    }
  

  createForm() {
    this.form = this.fb.group({
      id: [null], orderId:0,  orderNo: 0, orderDate: '',
      customerId: 0, customerName: '', interviewMode: 0, 
      interviewerName: '', interviewVenue: '',
      interviewDateFrom: '', interviewDateUpto: '',
      interviewLeaderId: 0, customerRepresentative: '', 
      interviewStatus: '', concludingRemarks: '',
      interviewItems: this.fb.array([])
    });

    //if (!this.isAddMode) this.loadMember();
  }

  populateForm(intervw: IInterview) {
    this.form.patchValue( {
      id: intervw.id, orderNo: intervw.orderNo, orderId: intervw.orderId, 
      orderDate: intervw.orderDate, customerId: intervw.customerId,
      customerName: intervw.customerName, interviewerName: intervw.interviewerName, 
      interviewVenue: intervw.interviewVenue, 
      interviewDateFrom: intervw.interviewDateFrom, interviewDateUpto: intervw.interviewDateUpto,
      interviewLeaderId: intervw.interviewLeaderId, customerRepresentative: intervw.customerRepresentative,
      interviewStatus: intervw.interviewStatus, concludingRemarks: intervw.concludingRemarks
    });

    if (intervw.interviewItems !== null) this.form.setControl('interviewItems', this.setExistingItems(intervw.interviewItems));
  }

  
  setExistingItems(items: IInterviewItem[]) {

      items.forEach(ph => {
        this.interviewItems.push(this.fb.group({
          id: ph.id, interviewId: ph.interviewId, 
          orderItemId: ph.orderItemId,
          categoryId: ph.categoryId, 
          interviewDateFrom: ph.interviewDateFrom, 
          interviewDateUpto: ph.interviewDateUpto,
          interviewMode: ph.interviewMode, 
          interviewerName: ph.interviewerName,
          interviewStatus: ph.interviewStatus,
          concludingRemarks: ph.concludingRemarks
        }))
      });
  }

  
    get interviewItems() : FormArray {
      return this.form.get("interviewItems") as FormArray
    }

    customerChange() {

    }

    onSubmit() {

    }

    addItem(): void {
        this.interviewItems.push(this.fb.group({
          id: 0, interviewId: 0, 
          orderItemId: 0,
          categoryId: 0, 
          interviewDateFrom: 0, 
          interviewDateUpto: '',
          interviewMode: '', 
          interviewerName: '',
          interviewStatus: '',
          concludingRemarks: ''
        })
        )
    }

    openReviewModal(i: number){

    }
    
    getItemReviewString(v: string) {

    }

    displayAttendingCandidates(i: number) {

    }
}
