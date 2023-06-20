import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Account} from "../../components/model/account";
import {MessageService} from "../message/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Hero} from "../../components/model/hero";
import {serverUrl} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class InlogService {

  private accountsUrl = `${serverUrl}/accounts`;  // URL to web api


  // private heroesUrl = `${serverUrl}/heroes`;  // URL to web api


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      )
  }
  getAccount(id: number): Observable<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap(_ => this.log(`fetched account id=${id}`)),
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    );
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.post(this.accountsUrl, account, this.httpOptions).pipe(
      tap(_ => this.log(`ingelogd=${account.gebruikersnaam}`)),
      catchError(this.handleError<any>('inloggen'))
    );
  }

  login(gebruikersnaam: string, wachtwoord: string): Observable<any> {
    return this.http.post(this.accountsUrl, {
      gebruikersnaam,
      wachtwoord
    }, this.httpOptions);
  }

  private log(message: string) {
    this.messageService.add(`InlogService: ${message}`);
  }

}


