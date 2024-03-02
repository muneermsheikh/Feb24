import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInterviewBrief } from 'src/app/shared/models/hr/interviewBrief';
import { IInterviewItemDto } from 'src/app/shared/models/hr/interviewItemDto';
import { InterviewService } from 'src/app/shared/services/hr/interview.service';

@Component({
  selector: 'app-interview-item',
  templateUrl: './interview-item.component.html',
  styleUrls: ['./interview-item.component.scss']
})
export class InterviewItemComponent implements OnInit {

  @Input() interview: IInterviewBrief | undefined;
  @Output() editEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();
  
  catsandcands: IInterviewItemDto[] = [];
  currentId=0;

  constructor(private service: InterviewService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  editInterview(id: number) {
    this.editEvent.emit(id);
  }

  deleteInterview(id: number) {
    this.deleteEvent.emit(id);
  }

  displayCategories(id: number) {
    this.service.getInterviewItemCatAndCandidates(id).subscribe(response => {
      this.catsandcands = response;
    })
  }
}
