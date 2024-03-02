import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { InputModalComponent } from 'src/app/shared/components/modal/input-modal/input-modal.component';
import { IUser } from 'src/app/shared/models/admin/user';
import { IInterview } from 'src/app/shared/models/hr/interview';
import { IInterviewBrief } from 'src/app/shared/models/hr/interviewBrief';
import { IPagination } from 'src/app/shared/models/pagination';
import { interviewParams } from 'src/app/shared/params/admin/interviewParams';
import { InterviewService } from 'src/app/shared/services/hr/interview.service';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm: ElementRef | undefined;
  iParams = new interviewParams();

  totalCount: number = 0;
  user?: IUser;
  returnUrl: string = '';

  interviews: IInterviewBrief[] | undefined | null;
  bsModalRef: BsModalRef | undefined;
  interview: IInterview | undefined;

  sortOptions = [
    {name:'By Order No', value:'orderno'},
    {name:'By Order No Desc', value:'ordernodesc'},
    {name:'By Order Date', value:'orderdate'},
    {name:'By Order Date Desc', value:'orderdatedesc'},
    {name:'By Category Name', value:'category'},
    {name:'By Category Name Desc', value:'categorydesc'},
    {name:'By Status', value:'status'},
    {name:'By Venue', value:'venue'}
  ]


  constructor(private activatedRoute: ActivatedRoute, private service: InterviewService,
    private modalService: BsModalService, private toastr: ToastrService, private router: Router) {

        //read navigationExtras
        let nav: Navigation | undefined | null= this.router.getCurrentNavigation();
          
        if (nav?.extras && nav.extras.state) {
            if(nav.extras.state['userObject']) this.user = nav.extras.state['userObject'];
            if(nav.extras.state['returnUrl']) this.returnUrl=nav.extras.state['returnUrl'] as string;
        }
     }

  ngOnInit(): void {
    this.getInterviews(false);

    /*this.activatedRoute.data.subscribe(data => { 
      if(data !==null) {
        this.interviews = data['interviews'];
        this.totalCount = data['count'];
      } 
    })
    */
  }

  getInterviews(useCache: boolean) {

    this.service.getInterviews(useCache).subscribe({
      next: data => {
          this.interviews = data.data; 
          this.totalCount = data.count
      }, 
      error: (error: any) =>
        console.log(error()
      )
    })
  }

  onSearch() {
    const params = this.service.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.service.setParams(params);
    this.getInterviews(true);
  }

  onReset() {
    this.searchTerm!.nativeElement.value = '';
    this.iParams = new interviewParams();
    this.service.setParams(this.iParams);
    this.getInterviews(false);
  }

  addNewInterview() {

    const config = {
      class:'modal-dialog-centered modal-md',
      initialState: {
        title: 'get Order number, to retrieve its interviw data'
      }
    };
    
    this.bsModalRef = this.modalService.show(InputModalComponent, config);

    this.bsModalRef.content.returnStringEvent.subscribe((response: string) => {
      if(+response===0) {
        this.toastr.warning('aborted');
      } else {
        this.navigateByurl('/interviews/editinterview/' + response);
      }
    })
    /*
    this.bsModalRef.content.returnStringEvent.pipe(
      switchMap(orderno => this.service.getOrCreateInterviewFromOrderNo(+orderno).pipe(
        catchError(err => {
          console.log('Error in getting interview', err);
          this.toastr.error('failed to retrieve interview detail from server -' + err);
          return of(undefined);
        }),
        tap(res => this.toastr.success('interview data retrieved')),
        //tap(res=>console.log('delete voucher succeeded')),
      )),
      catchError(err => {
        this.toastr.error('Error in getting invoice number parameter', err);
        return of(undefined);
      })
    ).subscribe(
      response => {
        console.log('interview data retrieved');
        this.toastr.success('interview data created');
        this.interview=response;
        this.navigateByurl('/interviews/add')
      },
      err => {
        console.log('any error NOT handed in catchError() or if throwError() is returned instead of of() inside catcherror()', err);
      }
    )
    */

  }

  navigateByurl(sroute: string) {
    let route = sroute;
    this.router.navigate(
      [route], 
      { state: 
        { 
          userobject: this.user,
          //toedit: this.interview, 
          returnUrl: '/interviews/list',
          isAddMode: true 
        } 
      }
    );
  }

  editInterview(interviewid: number) {

  }

  deleteInterview(interviewid: number) {

  }

  onPageChanged(event: any){
    const params = this.service.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.service.setParams(params);
      this.getInterviews(true);
    }
  }

  onSortSelected(sort: any) {
    this.iParams.sort = sort;
    this.getInterviews(true);
  }

}
