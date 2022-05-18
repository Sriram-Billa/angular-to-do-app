import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  inputType = 'text';
  addButton = false;
  updateButton = false;
  public newTodo: ITodo = {
    UNIQUE_ID: 0,
    USER_ID: 'sriram',
    ACTIVE_STATUS: 'A',
    TODO_ITEM: '',
  };

  todos: ITodo[] = [];
  ngOnInit(): void {
    this.addButton = true;
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
  addTodo() {
    this._todoService.addTodo(this.newTodo.TODO_ITEM).subscribe((data) => {
      this.reloadCurrentRoute();
    });
  }

  getTodoById() {}
  editTodo(uniqueId: number) {
    this.updateButton = true;
    this.addButton = false;
    this._todoService.getTodoById(uniqueId).subscribe((data) => {
      this.newTodo = {
        UNIQUE_ID: data.uniqueId,
        TODO_ITEM: data.todoText,
        USER_ID: data.userId,
        ACTIVE_STATUS: data.activeStatus,
      };

      console.log(data);
    });
  }
  updateTodo() {
    console.log(this.newTodo);
    this._todoService
      .updateTodo(this.newTodo)
      .subscribe((data) => this.reloadCurrentRoute());
  }
}
