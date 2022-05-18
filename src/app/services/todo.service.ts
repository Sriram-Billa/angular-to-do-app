import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { ITodo } from '../models/itodo.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable()
export class TodoService {
  private API_URL = 'http://localhost:8080/api';
  constructor(
    private _http: HttpClient,
    private _configService: ConfigService
  ) {}

  getAllTodos(): Observable<any[]> {
    return this._http.get<any[]>(this.API_URL + '/all').pipe(
      tap({
        next: (data) => console.log(this.API_URL, data),
        error: (error) => this._configService.handleError(error),
      })
    );
  }

  deleteTodo(uniqueId: number) {
    return this._http.delete(this.API_URL + '/todo/' + uniqueId).pipe(
      tap({
        next: (data) => console.log(this.API_URL, data),
        error: (error) => this._configService.handleError(error),
      })
    );
  }
}
