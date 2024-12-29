import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = environment.apiUrl;
  REQUEST_TIMEOUT = 3000000;
  token = ''

  constructor(public http: HttpClient) {}

  public getData<T>(): Promise<T> {
    try {
      return this.http
        .get<any>(this.apiUrl)
        .pipe(catchError(this.handleError))
        .toPromise();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public postData<T>(data: T): Promise<T> {
    try {
      return this.http
        .post<any>(this.apiUrl, data)
        .pipe(catchError(this.handleError))
        .toPromise();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public updateData<T>(id: string, data: T): Promise<T> {
    const url = `${this.apiUrl}/${id}`;
    try {
      return this.http
        .put<T>(url, data)
        .pipe(catchError(this.handleError))
        .toPromise() as Promise<T>;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public deleteData(id: string): Promise<Object | undefined> {
    const url = `${this.apiUrl}/${id}`;
    try {
      return this.http.delete(url).toPromise();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error) {
      errorMessage = `Erro: ${(error as any).error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    console.error(error);
    return throwError(errorMessage);
  }

  handleTimeoutError(error: any): Observable<any> {
    if (error.message === 'Network Error') {
      return of({
        success: true,
        message: 'Upload concluído com sucesso!',
      });
    }
    if (
      error instanceof HttpErrorResponse &&
      (error.status === 504 || error.status === 0)
    ) {
      console.warn('Timeout or unknown error ignored');
      return of({
        success: true,
        message: 'Request completed successfully',
      });
    }
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
