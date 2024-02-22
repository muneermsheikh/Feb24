import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { IHelp } from "../shared/models/admin/help";


@Injectable({
	providedIn: 'root'
  })
  export class HelpResolver implements Resolve<IHelp> {
  
	constructor(private service: HelpService) {}
  
	resolve(route: ActivatedRouteSnapshot): Observable<IHelp> {
		
		var topic = route.paramMap.get('topic');
		
	   	return this.service.getHelp(topic);
	}
  
  }

  export const CustomerReviewResolver: ResolveFn<IHelp> = (
    route: ActivatedRouteSnapshot,
  ) => {
    var id = route.paramMap.get('topic');
    if (id===null || id === '') return of(null);
    return inject(HelpService).getCustomerReview(+id!);
  };
  