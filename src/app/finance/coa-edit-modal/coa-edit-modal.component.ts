import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ICOA } from 'src/app/shared/models/finance/coa';
import { COAService } from 'src/app/shared/services/finance/coa.service';

@Component({
  selector: 'app-coa-edit-modal',
  templateUrl: './coa-edit-modal.component.html',
  styleUrls: ['./coa-edit-modal.component.scss']
})
export class CoaEditModalComponent implements OnInit {
  
  @Input() editCOAEvent = new EventEmitter();
  
  matchingCOA: string='';
  matchingNames: string[]=[];

  title: string='';
  coa?: ICOA;
  //accountType: string='';
  //accountName: string='';
  //divn: string='';
  //accountClass: string='';
  //opBalance: number=0;
  
  accountClasses=[
    {'accountClass':'exp'}, {'accountClass':'banks'},{'accountClass':'salesiata'},{'accountClass':'personalaccount'}
    ,{'accountClass':'sales'},{'accountClass':'candidate'},{'accountClass':'asset'}
  ]

  constructor(public bsModalRef: BsModalRef, private coaService: COAService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkExists();
  }

  checkExists() {
    if(this.coa===null || this.coa!.accountName ==='') return;

    this.matchingNames=[];
    this.coaService.getMatchingCOAs(this.coa!.accountName).subscribe(response => {

      this.matchingNames=response;
    }, error => {
      this.matchingNames=[];
    })
    
  }

  updateCOA() {
    if(this.coa!.accountClass==='' || this.coa!.accountName==='' || this.coa!.accountType==='' || this.coa!.divn==='') {
      this.toastr.warning('all properties except Opening Balance are mandatory');
      return;
    }
    var newCOA = this.coa;  // new coa();
    /* newCOA.accountClass=this.accountClass;
    newCOA.accountName=this.accountName;
    newCOA.accountType=this.accountType;
    newCOA.divn=this.divn;
    newCOA.opBalance=this.opBalance;
    */

    this.editCOAEvent.emit(newCOA);
    this.bsModalRef.hide();
  }

  classChanged() {

  }
}
