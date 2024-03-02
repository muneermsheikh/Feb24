import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IOrderItemBriefDto } from 'src/app/shared/dtos/admin/orderItemBriefDto';
import { IUser } from 'src/app/shared/models/admin/user';

@Component({
  selector: 'app-order-item-ids-modal',
  templateUrl: './order-item-ids-modal.component.html',
  styleUrls: ['./order-item-ids-modal.component.scss']
})
export class OrderItemIdsModalComponent implements OnInit {

  @Input() emitterObj = new EventEmitter();
  user?: IUser;
  title='';
  orderItems: IOrderItemBriefDto[]=[];
  ids: number[]=[];
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  emitSelectedIds() {
    this.emitterObj.emit(this.ids);
    this.bsModalRef.hide();
  }

}
