import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IHelp } from 'src/app/shared/models/admin/help';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent {
  help: IHelp | undefined;
  
  constructor(public bsModalRef: BsModalRef) { }
}
