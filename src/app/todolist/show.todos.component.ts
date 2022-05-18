import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '../models/itodo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'show-todos',
  templateUrl: './show.todos.component.html',
})
export class ShowTodoComponent implements OnInit {
  constructor(private _todoService: TodoService, private _router: Router) {}
  title = 'My Todo list';
  todos: ITodo[] = [];
  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this._todoService.getAllTodos().subscribe((todos) => {
      todos.forEach((element) => {
        this.todos.push({
          UNIQUE_ID: element.uniqueId,
          USER_ID: element.userId,
          TODO_ITEM: element.todoText,
          ACTIVE_STATUS: element.activeStatus,
        });
      });
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
    this._router.navigate(['/home']);
    });
  }
  deleteTodo(uniqueId: number) {
    this._todoService.deleteTodo(uniqueId).subscribe((data) => {
      this.reloadCurrentRoute();
    });
  }
}
