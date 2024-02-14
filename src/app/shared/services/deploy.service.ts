import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { deployParams } from '../params/process/deployParams';
import { IDeployStage } from '../models/masters/deployStage';
import { ICVRefAndDeployDto } from '../dtos/process/cvRefAndDeployDto';
import { IPagination } from '../models/pagination';
import { IDeploymentPendingDto } from '../dtos/process/deploymentPendingDto';
import { depProcessParams } from '../params/process/depProcessParams';
import { IDeploymentDto } from '../models/process/deploymentdto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IDeployment } from '../models/process/deployment';
import { IDeploymentDtoWithErrorDto } from '../dtos/process/deploymentDtoWithErrorDto';
import { ICVReferredDto } from '../dtos/admin/cvReferredDto';
import { IUser } from '../models/admin/user';

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  pageSize=5;
  pageIndex=1;
  pParams = new deployParams();
  deployStages: IDeployStage[]=[];

  deploys: ICVRefAndDeployDto[]=[];
  pagination: IPagination<IDeploymentPendingDto[]>| undefined;
  
  cache = new Map();
  
  //for processDto list
  dParams = new depProcessParams();
  cacheDep = new Map();
  deployments: IDeploymentDto[]=[];
  
  constructor(private http: HttpClient) { }

  setOParams(params: deployParams) {
    this.pParams = params;
  }
  
  getOParams() {
    return this.pParams;
  }

  setDParams(params: depProcessParams) {
    this.dParams = params;
  }
  
  getDParams() {
    return this.dParams;
  }

  
  getCachedProcessesList(useCache: boolean) {
    const token = localStorage.getItem("token");
    if (token==='') return;
    
    if (useCache === false) this.cacheDep = new Map();
    
    if (this.cacheDep.size > 0 && useCache === true) {
      
      if (this.cacheDep.has(Object.values(this.dParams).join('-'))) {
        this.deployments = this.cacheDep.get(Object.values(this.dParams).join('-'));
        return of(this.deployments);
      }
    }

    return this.http.get<IDeploymentDto[]>(this.apiUrl + 'deploy/deploys/' + this.dParams.cvrefId)
      .pipe(
        map((response: any) => {
          this.cacheDep.set(Object.values(this.dParams).join('-'), response);
          this.deployments = response;
          return response;
        })
      )
  }

  getPendingProcessesPaginated(useCache: boolean) {

    const token = localStorage.getItem("token");
    if (token==='') return;
    
    if (useCache === false) this.cache = new Map();
    
    if (this.cache.size && useCache) {
      console.log('getting from cache', this.pParams);
      if (this.cache.has(Object.values(this.pParams).join('-'))) {
        this.pagination = this.cache.get(Object.values(this.pParams).join('-'));
        return of(this.pagination);
      }
    }

    console.log('getting from api', this.pParams);
    let params = new HttpParams();
    console.log('pParams search on:', this.pParams.searchOn);
    if(this.pParams.searchOn !=='' && this.pParams.search !== '') params = params.append(this.pParams.searchOn, this.pParams.search);

    params = params.append('sort', this.pParams.sort);
    params = params.append('pageIndex', this.pParams.pageNumber.toString());
    params = params.append('pageSize', this.pParams.pageSize.toString());

    console.log('params sent to api', params);
    return this.http.get<IPagination<IDeploymentPendingDto[]>>(this.apiUrl + 'deploy/pending', {params})
      .pipe(
        map(response => {
          this.cache.set(Object.values(this.pParams).join('-'), response);
          this.pagination = response;
          return response;
        })
      )
    }

  getDeployStatus() {
    //return this.http.get<IDeploymentStatus[]>(this.apiUrl + 'deploy/depstatus');
    if(this.deployStages.length > 0) return of(this.deployStages);

    return this.http.get<IDeployStage[]>(this.apiUrl + 'deploy/depstatus')
      .pipe(
        map(response => {
          this.deployStages = response;
          console.log('deploy.servic.ts, stages:', response);
          return response;
        })
      )
  }

  updateSingleTransaction(deploy: IDeploymentDto) {
    let params = new HttpParams();
    
    params = params.append('cVRefId', deploy.deployCVRefId);
    params = params.append('id', deploy.id);
    params = params.append('nextSequence', deploy.nextSequence);
    params = params.append('sequence', deploy.sequence);
    params = params.append('transactionDate', deploy.transactionDate.toDateString());
    params = params.append('nextStageDate', deploy.nextStageDate.toDateString());

    return this.http.put<boolean>(this.apiUrl + 'deploy/editSingleTransaction', {params});
  }

  updateDeployment(deps: IDeployment[]) {
    return this.http.put<boolean>(this.apiUrl + 'deploy', deps);
  }

  InsertDeployTransactions(deploys: IDeployment[] ){
    return this.http.post<IDeploymentDtoWithErrorDto>(this.apiUrl + 'deploy/posts', deploys);
  }

  getDeployments(i: number) {
    return this.http.get<IDeploymentDto[]>(this.apiUrl + 'deploy/deploys/' + i);
  }

  getCVReferredDto(cvrefid: number) {
    return this.http.get<ICVReferredDto>(this.apiUrl + 'deploy/cvreferreddto/' + cvrefid);
  }

  
  getNextSequence(cvrefid: number) {
    if(this.deployments.length===0 || this.dParams.cvrefId !== cvrefid){
      this.dParams.cvrefId=cvrefid;
      this.getCachedProcessesList(false);

    }
    var arr = new Array(this.deployments.length).map(x => x.sequence );

    var mx = Math.max(...arr);
    if(this.deployments !== undefined) {
      this.deployments.forEach(x => {
        if (x.sequence==mx) {
          
          return x.nextSequence;
        } else {
          return 0;
        }
      })
      return 0;
    } else {
      return 0;
    }
    
  }
  
  getNextNextStageId(stageId: number) {
    return this.deployStages.find(x => x.id==stageId)?.nextSequence;
  }

  getNextStageDate(stageId: number): Date {
    var day = this.deployStages.find(x => x.id==stageId)?.estimatedDaysToCompleteThisStage;
    console.log('day:', day);
    
    if(day !== undefined) {
      return new Date(new Date().setDate(new Date().getDate()+ day));
    } else {
      return new Date();
    }
    
  }
}
