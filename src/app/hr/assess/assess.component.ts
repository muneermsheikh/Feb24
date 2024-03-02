import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IOrderBriefDto, OrderBriefDto } from 'src/app/shared/dtos/admin/orderBriefDto';
import { IAssessment } from 'src/app/shared/models/admin/assessment';
import { IOrder } from 'src/app/shared/models/admin/order';
import { IOrderItemAssessment } from 'src/app/shared/models/admin/orderItemAssessment';
import { IOrderItemAssessmentQ } from 'src/app/shared/models/admin/orderItemAssessmentQ';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.scss']
})
export class AssessComponent {

  order?: IOrder;
  qs: IOrderItemAssessmentQ[] | undefined;
  form: FormGroup = new FormGroup({});

  constructor(private activatedRouter: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRouter.data.subscribe(data => { 
      this.order = data['order'];
      this.qs=data['assessmentItems']
      //console.log('assess.component.ts, order', this.order);
    })
  }

  displayQ(id: number) {
    this.qs?.filter(x => x.orderItemId == id);
  }

  updateQs(assessments: IAssessment[]) {
    this.toastr.info('received from child');
    console.log(assessments);
  }

}
