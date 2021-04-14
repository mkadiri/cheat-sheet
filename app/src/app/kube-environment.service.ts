import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {KubeEnvironment} from './kube-environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class KubeEnvironmentService {
  private kubeEnvironmentsUrl = 'https://auto-devops-api.local.syrupme.net/v1/kube-environments';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getEnvironments(): Observable<KubeEnvironment[]> {
    return this.http.get<KubeEnvironment[]>(this.kubeEnvironmentsUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched environments')),
        catchError(this.handleError<KubeEnvironment[]>('getEnvironments', []))
      );
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`KubeEnvironmentService: ${message}`);
  }
}
