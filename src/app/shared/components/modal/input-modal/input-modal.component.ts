import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent {

  @Input() returnStringEvent = new EventEmitter();
  
  inputValue: string = '';

  title: string= '';

  
  constructor(private toastr: ToastrService, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  returnInputValue() {
    if (this.inputValue==='' ) {
        this.toastr.warning('no value entered');
        return;
    }

    this.returnStringEvent.emit(this.inputValue);

    this.bsModalRef.hide();
  }
  
}
