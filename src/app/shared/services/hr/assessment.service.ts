import { Injectable } from '@angular/core';
import { ReplaySubject, take } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { IUser } from '../../models/admin/user';
import { assessmentParams } from '../../params/admin/assessmentParam';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { HttpClient } from '@angular/common/http';
import { IAssessment } from '../../models/admin/assessment';
import { IAssessmentQ } from '../../models/admin/assessmentQ';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  qParams = new assessmentParams();
  routeId: string='';
  user?: IUser;
  
  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private accountService:AccountsService,
    private http: HttpClient) { 
      this.accountService.currentUser$.pipe(take(1))
        .subscribe(user => this.user = user!);
    }

    getOrderItemAssessment(orderitemid: number) {

      var item = this.http.get<IAssessment>(this.apiUrl + 'orderassessment/itemassessment/' + orderitemid);
      return item;
    }
    
    getOrderAssessment(orderid: number) {
      return this.http.get<IAssessment>(this.apiUrl + 'orderassessment/orderassessment/' + orderid);
    }

    getAssessmentQBankOfCategoryId(orderitemid: number, professionId: number) {
      console.log('orderitemid', orderitemid);
      return this.http.get<IAssessmentQ[]>(this.apiUrl + 'AssessmentQBank/catqsbycategoryid/' 
        + orderitemid + '/' + professionId);
    }

    updateAssessment(assessment: IAssessment) {
      return this.http.put<boolean>(this.apiUrl + 'orderassessment/editassessment', assessment);
    }
    updateAssessmentQs(assessmentQs: IAssessmentQ[]) {
      return this.http.put<boolean>(this.apiUrl + 'orderassessment/updateassessmentqs', assessmentQs);
    }

    updateAssessmentQ(assessmentQ: IAssessmentQ) {
          return this.http.put<boolean>(this.apiUrl + 'orderassessment/edititemassessment', assessmentQ);
    }

    deleteAssessmentQ(questionId: number) {
      return this.http.delete<boolean>(this.apiUrl + 'orderassessment/assessmentq/' + questionId);
    }

    deleteAssessment(orderitemid: number) {
      return this.http.delete<boolean>(this.apiUrl + 'orderassessment/assessment/' + orderitemid);
    }

    AddNewAssessment(assessment: IAssessment) {
      
    }
}
