import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //TODO Replace 'your_token_here' with your actual token handling logic
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'Bearer your_token_here'
      })
    });
    return next.handle(authReq);
  }
}
