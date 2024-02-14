import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicationTaskInBrief } from 'src/app/shared/models/admin/applicationTaskInBrief';

@Component({
  selector: 'app-task-line',
  templateUrl: './task-line.component.html',
  styleUrls: ['./task-line.component.scss']
})
export class TaskLineComponent implements OnInit {

  @Input() task= new ApplicationTaskInBrief();  //InBrief;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @Output() completedevent = new EventEmitter<number>();
  @Input() boolEditable: boolean=false;   //flag to enable/disable edit buttons
  
  constructor() { }

  ngOnInit(): void {
  }

  markAsCompleted(taskid: number) {
    this.completedevent.emit(taskid);
  }

  markAsDeleted(taskid: number) {
    console.log('value emitted to delete', taskid);
    this.deleteEvent.emit(taskid);
  }

  deleteClicked() {
    this.editEvent.emit(this.task!.id);
  }

  editClicked() {
    this.editEvent.emit(this.task!.id);
  }

}
