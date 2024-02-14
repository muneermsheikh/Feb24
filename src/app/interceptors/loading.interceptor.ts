import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize, identity } from 'rxjs';
import { environment } from '../environments/environment';
import { BusyService } from '../shared/services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('emailExists') ||
      request.method === 'POST' && request.url.includes('orders') ||
      request.method === 'DELETE'
    ) {
      return next.handle(request);
    }

    this.busyService.busy();
    
    return next.handle(request).pipe(
      (environment.production ? identity : delay(1000)),
      finalize(() => this.busyService.idle() )
    )
  }
}
