import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEmployment } from 'src/app/shared/models/admin/employment';

@Component({
  selector: 'app-employmt-line',
  templateUrl: './employmt-line.component.html',
  styleUrls: ['./employmt-line.component.scss']
})
export class EmploymtLineComponent implements OnInit{

  @Input() employment: IEmployment | undefined;
  @Output() editEvent = new EventEmitter<IEmployment>();
  @Output() deleteEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  editEmployment() {
    this.editEvent.emit(this.employment);
  }

  deleteEmployment() {
    this.deleteEvent.emit(this.employment?.id);
  }
}
