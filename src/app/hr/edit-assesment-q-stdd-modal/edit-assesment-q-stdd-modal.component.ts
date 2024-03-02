import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IAssessmentStandardQ } from 'src/app/shared/models/admin/assessmentStandardQ';

@Component({
  selector: 'app-edit-assesment-q-stdd-modal',
  templateUrl: './edit-assesment-q-stdd-modal.component.html',
  styleUrls: ['./edit-assesment-q-stdd-modal.component.scss']
})
export class EditAssesmentQStddModalComponent implements OnInit {
  
  @Output() stddQEditEvent = new EventEmitter<IAssessmentStandardQ[]>();
  
  title: string='';
  id = 0;
  subject = '';
  qNo = 0;
  question = '';
  maxPoints = 0;
  
  bsValue = new Date();

  stddQ?: IAssessmentStandardQ;
  
  constructor(public bsModalRef: BsModalRef, 
      private toastr: ToastrService, 
      //private service: AssessmentService,
      private router: Router) {
        let nav: Navigation | null = this.router.getCurrentNavigation();

        if (nav?.extras && nav.extras.state) {
            //this.bolNavigationExtras=true;
            //if(nav.extras.state.returnUrl) this.returnUrl=nav.extras.state.returnUrl as string;

            if(nav.extras.state['stddQ']) {
              this.stddQ = nav.extras.state['stddQ'] as IAssessmentStandardQ;
            }
        }
       }

  ngOnInit(): void {
    if(this.stddQ !==undefined) {
      this.subject = this.stddQ.subject;
      this.id = this.stddQ.id;
      this.qNo = this.stddQ.questionNo;
      this.question = this.stddQ.question;
      this.maxPoints = this.stddQ.maxPoints;
    }
  }

  updateStandardQ() {
  
  if(this.subject === '' ||
    this.question === '' ||
    this.maxPoints === 0)  {
      this.toastr.warning('invalid inputs');
      return;
    }
  
  if(this.stddQ !== undefined) {
    this.stddQ!.subject = this.subject;
    this.stddQ!.question = this.question;
    this.stddQ!.maxPoints = this.maxPoints;
    
    var stddqs: IAssessmentStandardQ[]=[];
    stddqs.push(this.stddQ);
    console.log('assessmentQ modal emitted:', stddqs);
    this.stddQEditEvent.emit(stddqs);
    this.bsModalRef.hide();
  } else {
    this.toastr.warning('object is undefined');
  }
}
}
