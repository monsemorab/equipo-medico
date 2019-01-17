import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class ApiRequestService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  /**
   * This is a Global place to add all the request headers for every REST calls
   */
  static getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  /**
   * Global error handler for all the http methods
   * @param error
   */
  private handleError(error: any) {
    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['/logout']);
    } else if (error.status === 400 || error.status === 500) {
      return observableThrowError(error.error);
    } else {
      return observableThrowError(error);
    }
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    return this.http.get(url, {withCredentials: true, headers: ApiRequestService.getHeaders(), params: urlParams})
      .pipe(catchError(this.handleError));
  }

  post(url: string, body: Object): Observable<any> {
    return this.http.post(url, JSON.stringify(body), {withCredentials: true, headers: ApiRequestService.getHeaders()})
      .pipe(catchError(this.handleError));
  }


  put(url: string, body: Object): Observable<any> {
    return this.http.put(url, JSON.stringify(body), {withCredentials: true, headers: ApiRequestService.getHeaders()})
      .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, {withCredentials: true, headers: ApiRequestService.getHeaders()})
      .pipe(catchError(this.handleError));
  }

}
