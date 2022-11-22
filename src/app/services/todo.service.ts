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
  ) { }

  getAllTodos(): Observable<any[]> {
    console.log("something");
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

  addTodo(newTodo: string) {
    return this._http.post(this.API_URL + '/todo/add', {
      uniqueId: 0,
      userId: 'Sriram',
      todoText: newTodo,
      activeStatus: 'A',
    });
  }

  getTodoById(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + '/todo/' + id);
  }

  updateTodo(todo: any): Observable<any> {
    return this._http.post(this.API_URL + '/todo/update', {
      uniqueId: todo.UNIQUE_ID,
      userId: todo.USER_ID,
      todoText: todo.TODO_ITEM,
      activeStatus: todo.ACTIVE_STATUS,
    });
  }
}
