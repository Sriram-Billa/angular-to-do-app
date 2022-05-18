import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './config/config.service';
import { HeaderComponent } from './header/header.component';
import { TodoService } from './services/todo.service';

import { ShowTodoComponent } from './todolist/show.todos.component';

@NgModule({
  declarations: [HeaderComponent, AppComponent, ShowTodoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [TodoService, ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
