import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IEmployment } from 'src/app/shared/models/admin/employment';
import { IUser } from 'src/app/shared/models/admin/user';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-employment-modal',
  templateUrl: './employment-modal.component.html',
  styleUrls: ['./employment-modal.component.scss']
})
export class EmploymentModalComponent {

  @Input() emp: IEmployment | undefined;
  @Output() employmentIdEdited: IEmployment | undefined;
  @Input() updateEmp = new EventEmitter();
  @Input() user?: IUser;

  bsValue = new Date();
  bsRangeValue= new Date();
  maxDate = new Date();
  minDate = new Date();
  bsValueDate = new Date();

  
  constructor(public bsModalRef: BsModalRef, private toastr:ToastrService, 
    private confirmService: ConfirmService) { }

  ngOnInit(): void {

  }

  updateEmployment() {

    //verify data inputs
    this.updateEmp.emit(this.emp);
      this.bsModalRef.hide();
  }

  close() {
      this.bsModalRef.hide();
  }
}
