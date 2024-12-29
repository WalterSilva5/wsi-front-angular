import { Injectable } from '@angular/core';
import { DataService } from '../../../modules/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError, timeout } from 'rxjs';
import { PaginatedData } from '../../../types/paginated-data.type';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthDto } from '../dto/auth-data.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends DataService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  login(authData: AuthDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, authData).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('error', error);
        return of(error);
      })
    );
  }
}
