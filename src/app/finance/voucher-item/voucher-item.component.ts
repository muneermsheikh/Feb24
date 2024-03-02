import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVoucherDto } from 'src/app/shared/dtos/finance/voucherDto';

@Component({
  selector: 'app-voucher-item',
  templateUrl: './voucher-item.component.html',
  styleUrls: ['./voucher-item.component.scss']
})
export class VoucherItemComponent implements OnInit{

  @Input() t?: IVoucherDto;
  
  @Output() editEvent = new EventEmitter<number>();
  @Output() viewEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  
  editTransaction(id: number) {
    this.editEvent.emit(id);
  }

  viewTransaction(id: number) {
    this.viewEvent.emit(id);
  }
  
  deleteTransaction(id: number) {
    this.deleteEvent.emit(id);
  }

}
