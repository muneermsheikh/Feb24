import { Component, Input } from '@angular/core';
import { IAssessmentQBank } from 'src/app/shared/models/admin/assessmentQBank';

@Component({
  selector: 'app-assess-line',
  templateUrl: './assess-line.component.html',
  styleUrls: ['./assess-line.component.scss']
})
export class AssessLineComponent {

  @Input() q?: IAssessmentQBank;

}
