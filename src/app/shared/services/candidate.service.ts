import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { IUser } from '../models/admin/user';
import { paramsCandidate } from '../params/hr/paramsCandidate';
import { IPagination } from '../models/pagination';
import { CandidateBriefDto, ICandidateBriefDto } from '../dtos/admin/candidateBriefDto';
import { ICandidateCity } from '../models/hr/candidateCity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ICandidate } from '../models/hr/candidate';
import { IApiReturnDto } from '../dtos/admin/apiReturnDto';
import { ICVReviewDto, cvReviewDto } from '../dtos/admin/cvReviewDto';
import { IUserAttachment } from '../models/hr/userAttachment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  cvParams = new paramsCandidate();
  pagination?: IPagination<ICandidateBriefDto[]>;
  paginationBrief?: IPagination<CandidateBriefDto[]>;
  cities: ICandidateCity[]=[];
  cache = new Map<string, IPagination<CandidateBriefDto[]>>(); // new Map();
  cacheBrief = new Map<string, IPagination<CandidateBriefDto[]>>();

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
  
  async onClickLoadDocument() {
    // get a document from the Web API endpoint 'LoadDocument'
    return this.http.get<any>(this.apiUrl + 'candidates/loaddocument');
  }

  getCandidates(useCache: boolean=true): Observable<IPagination<ICandidateBriefDto[]>> { 
    
    if (useCache === false)  this.cache = new Map();
    
    if (this.cache.size > 0 && useCache === true) {
      if (this.cache.has(Object.values(this.cvParams).join('-'))) {
        this.pagination = this.cache.get(Object.values(this.cvParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();
    if (this.cvParams.city !== "") params = params.append('city', this.cvParams.city);
    if (this.cvParams.professionId !== 0) params = params.append('professionId', this.cvParams.professionId!.toString());
    if (this.cvParams.agentId !== 0) params = params.append('agentId', this.cvParams.agentId!.toString());
    if (this.cvParams.search) params = params.append('search', this.cvParams.search);
    
    params = params.append('sort', this.cvParams.sort);
    params = params.append('pageIndex', this.cvParams.pageNumber.toString());
    params = params.append('pageSize', this.cvParams.pageSize.toString());
    console.log('candparams:', params );
    return this.http.get<IPagination<ICandidateBriefDto[]>>(this.apiUrl + 
        'candidate/candidatepages', {params}).pipe(
      map(response => {
        this.cache.set(Object.values(this.cvParams).join('-'), response)
        this.pagination = response;
        return response;
      })
    )

  }

  checkEmailExists(email: string) {
    return this.http.get(this.apiUrl + 'account/emailexists?email=' + email);
  }

  checkPPExists(ppnumber: string) {
    return this.http.get(this.apiUrl + 'account/ppexists?ppnumber=' + ppnumber);
  }
  
  getCandidate(id: number) {
    return this.http.get<ICandidate>(this.apiUrl + 'candidate/byid/' + id);
  }

  getCandidateBrief(id: number) {
    //let dto: ICandidateBriefDto;

    var dto = this.pagination?.data.find(p => p.id === id);

    if (dto) return of(dto);
    
    return this.http.get<ICandidateBriefDto>(this.apiUrl + 'candidate/briefbyid/' + id);
  }

  getCandidateBriefDtoFromAppNo(id: number) {
    return this.http.get<ICandidateBriefDto>(this.apiUrl + 'candidate/byappno/' + id);
  }

  registerWithFiles(model: any) {
    return this.http.post<IApiReturnDto>(this.apiUrl + 'account/RegisterNewCandidate', model );
    
  }

  /*register(model: any) {
       return this.http.post<IApiReturnDto>(this.apiUrl + 'account/registerCandidate', model );
      //return this.http.post<IApiReturnDto>(this.apiUrl + 'account/RegisterNewCandidate', model);
    }
  */

  UpdateCandidateWithFiles(model: any) {
      return this.http.put<string>(this.apiUrl + 'candidate/updatecandidatewithfiles', model);
    }
    
  setCurrentUser(user: IUser) {
 
    localStorage.setItem('token', user.token);
    this.currentUserSource.next(user);
  }
  
  setCVParams(params: paramsCandidate) {
    this.cvParams = params;
  }
  
  getCVParams() {
    return this.cvParams;
  }

  getCandidateCities() {
    if (this.cities.length > 0) {
      return of(this.cities);
    }
  
    return this.http.get<ICandidateCity[]>(this.apiUrl + 'candidate/cities' ).pipe(
      map(response => {
        this.cities = response;
        return response;
      })
    )
  }
  
  submitCVsForReview(itemIds: number[], cvids: number[]) {
      
      if (itemIds.length === 0 || cvids.length ===0) {
        this.toastr.warning("candidate Ids or item Ids data not provided");
        return;
      }

      var cvrvws: ICVReviewDto[]=[];
      cvids.forEach(c => {
        itemIds.forEach(i => {
          var cvrvw = new cvReviewDto();  
          cvrvw.candidateId=c;
          cvrvw.orderItemId=i;
          cvrvw.execRemarks='';
          cvrvws.push(cvrvw);
        })
      })

      return this.http.post(this.apiUrl + 'cvreviews', cvrvws);
  }
  viewDocument(id: number) {
    // get a document from the Web API endpoint 'LoadDocument'
    return this.http.get<any>(this.apiUrl + 'fileupload/viewdocument/' + id);
  }

  updateAttachments(model: IUserAttachment) {
    return this.http.post<IUserAttachment>(this.apiUrl + 'userattachment/attachment', model);
  }

  getAttachment(candidateid: number) {
    return this.http.get<IUserAttachment[]>(this.apiUrl + 'userattachment/' + candidateid);
  }

  deleteAttachment(attachmentId: number) {
    return this.http.delete<boolean>(this.apiUrl + 'userattachment/' + attachmentId);
  }

  setPhoto(model: IUserAttachment) {
    return this.http.put<boolean>(this.apiUrl + 'userattachment/setPhoto', model);
  }
}
