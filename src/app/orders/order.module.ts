import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractReviewItemModalComponent } from './contract-review-item-modal/contract-review-item-modal.component';
import { SharedModule } from '../shared/shared.module';
import { OrderForwardComponent } from './order-forward/order-forward.component';
import { OrderItemIdsModalComponent } from './order-item-ids-modal/order-item-ids-modal.component';
import { JdModalComponent } from './jd-modal/jd-modal.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { RemunerationModalComponent } from './remuneration-modal/remuneration-modal.component';
import { ItemReviewStatusNamePipe } from './item-review-status-name.pipe';
import { ReviewItemStatusNamePipe } from './review-item-status-name.pipe';
import { ReviewStatusNamePipe } from './review-status-name.pipe';
import { OrderIndexComponent } from './order-index/order-index.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderLineComponent } from './order-line/order-line.component';



@NgModule({
  declarations: [
    ContractReviewItemModalComponent,
    OrderForwardComponent,
    OrderItemIdsModalComponent,
    JdModalComponent,
    OrderEditComponent,
    RemunerationModalComponent,
    ItemReviewStatusNamePipe,
    ReviewItemStatusNamePipe,
    ReviewStatusNamePipe,
    OrderIndexComponent,
    OrderLineComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
