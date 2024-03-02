import { Component } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { AssessmentStandardQ, IAssessmentStandardQ } from 'src/app/shared/models/admin/assessmentStandardQ';
import { assessmentStddQParam } from 'src/app/shared/models/admin/assessmentStddQParam';
import { IUser } from 'src/app/shared/models/admin/user';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { StddqsService } from 'src/app/shared/services/hr/stddqs.service';
import { EditAssesmentQStddModalComponent } from '../edit-assesment-q-stdd-modal/edit-assesment-q-stdd-modal.component';

@Component({
  selector: 'app-assess-stdd',
  templateUrl: './assess-stdd.component.html',
  styleUrls: ['./assess-stdd.component.scss']
})
export class AssessStddComponent {

  bsModalRef?: BsModalRef;
  qParams = new assessmentStddQParam();
  stddqs: IAssessmentStandardQ[]=[];
  stddqsEdited: IAssessmentStandardQ[]=[];

  totalPoints=0;
  bolNavigationExtras=false;
  returnUrl = '/hr';
  user?: IUser;

  constructor(private activatedRoute: ActivatedRoute, 
      private router: Router,
      private service: StddqsService , 
      private toastr: ToastrService,
      private modalService: BsModalService,
      private confirmService: ConfirmService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

          //navigationExtras
          let nav: Navigation|null = this.router.getCurrentNavigation() ;

          if (nav?.extras && nav.extras.state) {
              this.bolNavigationExtras=true;
              if(nav.extras.state['returnUrl']) this.returnUrl=nav.extras.state['returnUrl'] as string;

              if( nav.extras.state['user']) {
                this.user = nav.extras.state['user'] as IUser;
                //this.hasEditRole = this.user.roles.includes('AdminManager');
                //this.hasHRRole =this.user.roles.includes('HRSupervisor');
              }
            }
       }

  ngOnInit(): void {
    this.service.setQParams(this.qParams);
    this.activatedRoute.data.subscribe(data => { 
      this.stddqs = data['stddqs'];
      this.totalPoints =  this.stddqs.map((x:any) => x.maxPoints).reduce((a:number, b: number) => a + b,0);
    })
  }

  
  deletestddq(id: number) {
      this.confirmService.confirm('confirm delete this Standard Question', 'confirm delete voucher').pipe(
        filter(result => result),
        switchMap(confirmed => this.service.deletestddq(id).pipe(
          catchError(err => {
            console.log('Error in deleting the Standard Question', err);
            return of();
          }),
          tap(res => this.toastr.success('deleted the Standard Question')),
          //tap(res=>console.log('delete voucher succeeded')),
        )),
        catchError(err => {
          this.toastr.error('Error in getting delete confirmation', err);
          return of();
        })
      ).subscribe(
        deleteReponse => {
          console.log('delete succeeded');
          this.toastr.success('Standard Question deleted');
        },
        err => {
          console.log('any error NOT handed in catchError() or if throwError() is returned instead of of() inside catcherror()', err);
        }
      )
  }

  editstddQ(stddQ: IAssessmentStandardQ) {

    if(stddQ===null) stddQ = new AssessmentStandardQ();
    
      const config = {
        class: 'modal-dialog-centered modal-lg',
        initialState: {
          stddQ: stddQ
        }
      }

      this.bsModalRef = this.modalService.show(EditAssesmentQStddModalComponent, config);
      
      this.bsModalRef.content.stddQEditEvent.subscribe({
        next: (editedQ: IAssessmentStandardQ[]) => {
          if(editedQ !=null) {
            //this.stddqsEdited.push(editedQ);
            this.service.updateStddQ(editedQ).subscribe({
              next: response => {
                if(response) {
                  this.toastr.success('Standard Assessment Question updated');
                } else {
                  this.toastr.info('failed to update the standard assessment question');
                }
              },
              error: error => this.toastr.error('Failed to update the standardd assessment Question', error)
            })
          }
        },
        error: (error: any) => this.toastr.error('failed to retrieve the edited standard question from Modal', error)
      })

    }
    
  close(){
    this.router.navigateByUrl(this.returnUrl);
  }

  recalculate() {
    this.totalPoints =  this.stddqs.map((x:any) => x.maxPoints).reduce((a:number, b: number) => a + b,0);
  }

}
