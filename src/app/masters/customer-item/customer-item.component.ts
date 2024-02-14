import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICustomerBriefDto } from 'src/app/shared/dtos/admin/customerBriefDto';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {

  @Output() editCustEvent = new EventEmitter<number>();

  @Input() cust: ICustomerBriefDto | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    if(this.cust !== undefined) this.editCustEvent.emit(this.cust.id);
  }
}
