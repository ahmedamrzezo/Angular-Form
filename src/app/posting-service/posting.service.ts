import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geek } from '../models/geek';
import { Observable } from 'rxjs';
import { map, tap, catchError} from 'rxjs/operators';


@Injectable()

export class PostingService {

  constructor(private http: Http) {

  }

  private extractData(res: Response) {
    const body = res.json();
    console.log(body.fields);
    return body.fields || { };
  }

  private handleError(error: any) {
    console.error('Error Just Happened, Please try again. : ', error);
    return Observable.throw(error.statusText);
  }

  private extractCities(res: Response) {
    const body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  getCities(): Observable<any> {
    return this.http.get('http://localhost:3100/getCities')
    .pipe(
      map(this.extractCities),
      catchError(this.handleError)
    );
  }

  postGeekForm(geek: Geek): Observable<any> {
    const body = JSON.stringify(geek);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:3100/postGeek', body, options)
                    .pipe(
                      tap(this.extractData),
                      catchError(this.handleError)
                    );
  }
}
