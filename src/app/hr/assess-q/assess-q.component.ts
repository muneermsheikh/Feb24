import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IOrderItemBriefDto } from 'src/app/shared/dtos/admin/orderItemBriefDto';
import { IAssessment } from 'src/app/shared/models/admin/assessment';
import { IAssessmentQ } from 'src/app/shared/models/admin/assessmentQ';
import { IOrderItemAssessmentQ } from 'src/app/shared/models/admin/orderItemAssessmentQ';
import { AssessmentService } from 'src/app/shared/services/hr/assessment.service';
import { StddqsService } from 'src/app/shared/services/hr/stddqs.service';

@Component({
  selector: 'app-assess-q',
  templateUrl: './assess-q.component.html',
  styleUrls: ['./assess-q.component.scss']
})
export class AssessQComponent {
  //orderitem: IOrderItemBriefDto | undefined;
  @Input() qs: IOrderItemAssessmentQ[] | undefined;
  @Input() categoryName: string='';
  @Input() orderNo: number=0;
  form: FormGroup = new FormGroup({});
  
  constructor(private activatedRoute: ActivatedRoute, private stddqservice: StddqsService,
    private service: AssessmentService, private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    /*
    this.activatedRoute.data.subscribe(data => { 
      this.orderitem = data['itembrief'];
      this.assess= data['assessment'];
      //console.log('ngONINit', this.assess);
      this.createForm();
      if (this.assess) {
        this.patchForm(this.assess);
      } 
    })
    */
  }

  createForm() {
    this.form = this.fb.group({
      id: 0, orderAssessmentId: 0, orderItemId: 0,
      orderId: 0, orderNo: 0, categoryId: 0, categoryName: '',
      orderItemAssessmentQs: this.fb.array([])
     })
  }

  patchForm(p:IAssessment) {
    this.form.patchValue({
      id: p.id, orderAssessmentId: p.orderAssessmentId, 
      orderItemId: p.orderItemId, orderId: p.orderId, 
      orderNo: p.orderNo, categoryId: p.categoryId, 
      categoryName: p.categoryName
    })
    this.form.setControl('orderItemAssessmentQs', this.setExistingItems(p.orderItemAssessmentQs));
  }

  setExistingItems(items: IAssessmentQ[]) {
    items.forEach(i => {
       this.orderItemAssessmentQs.push(this.fb.group({
        id: i.id, assessmentId: i.assessmentId, orderItemId: i.orderItemId,
        orderId: i.orderId, questionNo: i.questionNo, subject: i.subject,
        question: i.question, maxMarks: i.maxPoints, isMandatory: i.isMandatory
      }))
    });
   
  }

  addStddQ() {
    
    this.stddqservice.getStddQs().subscribe(response => {
      const stddqs = response;
      if (stddqs===null) {
        this.toastr.warning('failed to retrieve standard questions');
        return;
      }

      stddqs.forEach(q => {
        this.orderItemAssessmentQs.push(this.fb.group({
          id: q.id, assessmentId: q.assessmentId, orderId: q.orderId,
          questionNo: q.questionNo, subject: q.subject, question: q.question, maxMarks: q.maxPoints,
          isMandatory: false
        }))
      })
    }, error => {
      this.toastr.error('error - failed to retrieve standard questions');
    })
  }

  get orderItemAssessmentQs(): FormArray {
    return this.form.get('orderItemAssessmentQs') as FormArray;
  }

  newOrderItemAssessmentQ(): FormGroup{
    return this.fb.group({
      id: 0, assessmentId: 0, orderItemId: 0,
      orderId: 0, questionNo: 0, subject: '',
      maxMarks: 0, isMandatory: false
    })
  }

  addOrderItemAssessmentQ(){
    this.orderItemAssessmentQs.push(this.newOrderItemAssessmentQ());
  }

  removeOrderItemAssessmentQ(i: number) {
    this.orderItemAssessmentQs.removeAt(i);
    this.orderItemAssessmentQs.markAsDirty();
    this.orderItemAssessmentQs.markAsTouched();
  }

  update() {
    this.service.updateAssessment(this.form.value).subscribe(response => {
      if (response) {
        this.toastr.success('updated the Assessment Question');
        
      } else {
        this.toastr.warning('failed to update the Assessment Question');
      }
    }, (error: any) => {
      this.toastr.error('error updating the assessment question', error);
    })
  }

  calcualteTotals() {
    //const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    return this.qs!.map(x => x.maxPoints).reduce((a, b) => a + b);
  }
 
  editOrderItemAssessmentQ(i: number) {

  }
    
}
