import { Injectable } from '@angular/core';
import { ReplaySubject, of, take } from 'rxjs';
import { CandidateBriefDto, ICandidateBriefDto } from '../dtos/admin/candidateBriefDto';
import { CVBriefParam } from '../params/hr/cvBriefParam';
import { ICandidateAssessedDto } from '../dtos/hr/candidateAssessedDto';
import { ICandidateAssessmentAndChecklist } from '../models/hr/candidateAssessmentAndChecklist';
import { IChecklistHRDto } from '../dtos/hr/checklistHRDto';
import { ICandidateAssessment } from '../models/hr/candidateAssessment';
import { ICandidateAssessmentWithErrorStringDto } from '../dtos/hr/candidateAssessmentWithErrorStringDto';
import { IOrderItemAssessmentQ } from '../models/admin/orderItemAssessmentQ';
import { AccountsService } from './accounts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPagination } from '../models/pagination';
import { IUser } from '../models/admin/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CVAssessService {

 
  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  user?: IUser;
  header?: HttpHeaders;

  cvBriefs: ICandidateBriefDto[]=[];

  cache = new Map();
  cvParams = new CVBriefParam();

  pagination?: IPagination<CandidateBriefDto>; // = new PaginationCandidateBrief();

  constructor(private http: HttpClient, private accountService: AccountsService
    ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user!);
  }

 
  updateCVAssessment(model: any) {
    return this.http.put(this.apiUrl + 'candidateassessment/assess', model);
  }

  getOrderItemAssessmentQs(orderitemid: number) {
    return this.http.get<IOrderItemAssessmentQ[]>(this.apiUrl + 'orderassessment/itemassessmentQ/' + orderitemid);
  }

  updateCVAssessmentHeader(model: ICandidateAssessment) {
    return this.http.put<ICandidateAssessmentWithErrorStringDto>(this.apiUrl + 'candidateassessment', model);
  }

  insertCVAssessmentHeader(requireReview: boolean, candidateid: number, orderitemid: number, dt: Date) {
    
    return this.http.post<ICandidateAssessmentWithErrorStringDto>(this.apiUrl + 'candidateassessment/assess/' 
      +  requireReview + '/' + candidateid + '/' + orderitemid, {});
  }

  getCVAssessmentObject(requireReview: boolean, candidateid: number, orderitemid: number, dt: Date) {
    return this.http.get<ICandidateAssessment>(this.apiUrl + 'candidateassessment/assessobject/' +  requireReview + '/' + candidateid + '/' + orderitemid);
  }


  insertCVAssessment(model: any) {
    return this.http.post(this.apiUrl + 'candidateassessment/assess', model);
  }

  getCVAssessment(cvid: number, orderitemid: number) {
    return this.http.get<ICandidateAssessment>(this.apiUrl + 'candidateassessment/' + orderitemid + '/' + cvid);
  }

  GetOrCreateNewCheckist(cvid: number, orderitemid: number) {
      return this.http.get<IChecklistHRDto>(this.apiUrl + 'candidateassessment/checklist/' + orderitemid + '/' + cvid);
  }
  

  getCVAssessmentAndChecklist(cvid: number, orderitemid: number) {
    return this.http.get<ICandidateAssessmentAndChecklist>(this.apiUrl + 
        'candidateassessment/assessmentandchecklist/' + orderitemid + '/' + cvid);
  }


  getCVAssessmentsOfACandidate(cvid: number) {
    return this.http.get<ICandidateAssessedDto[]>(this.apiUrl + 'candidateassessment/assessmentsofcandidateid/' +cvid);
  }


  deleteAssessment(assessmentid: number) {
    return this.http.delete<boolean>(this.apiUrl + 'candidateassessment/assess/' + assessmentid);
  }

  setCVParams(params: CVBriefParam) {
    this.cvParams = params;
  }

  getCVParams() {
    return this.cvParams;
  }

  getCVBrief() { 
    
    var brief = this.cvBriefs.filter(x => x.id===this.cvParams.candidateId)[0];
    //console.log('in cvassess serice, cvparams.candidateid', this.cvParams.candidateId,'brief:', brief);
    return brief;

  }

  setCVBriefData(cvbriefs: ICandidateBriefDto[]) {
    this.cvBriefs = cvbriefs;
    this.cache.set(Object.values(this.cvParams).join('-'), cvbriefs);
    this.pagination!.count=this.cvBriefs.length;
  }

  getCVBriefData() {
    if (this.cache.has(Object.values(this.cvParams).join('-'))) {
      this.pagination!.data = this.cache.get(Object.values(this.cvParams).join('-'));
      return of(this.pagination);
    }
    return of(undefined);
  }


  getCVBriefs(useCache: boolean) { 

      if (useCache === false)  this.cache = new Map();

      if (this.cache.size > 0 && useCache === true) {
        if (this.cache.has(Object.values(this.cvParams).join('-'))) {
          this.pagination!.data = this.cache.get(Object.values(this.cvParams).join('-'));
          return of(this.pagination);
        }
      }
     return of(undefined);
  }
}
