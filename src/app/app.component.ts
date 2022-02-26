import { Component } from '@angular/core';
import { ToDo } from './ToDo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTask: string;
  TodoList: ToDo[];
  localItem: string;

  constructor() {
    this.localItem = localStorage.getItem("list");
    if(this.localItem===null) {
      this.TodoList = [];
    }
    else {
      let tempList = JSON.parse(this.localItem);
      this.TodoList = tempList.map(todoEntry => new ToDo(todoEntry.task, todoEntry.check));
    }
  }
  addTodo() {
    if(this.newTask==='' || this.newTask===null || this.newTask===undefined) {
      alert("Enter a valid argument!");
      return;
    }
    this.TodoList.push({
      task: this.newTask,
      check: false
    });
    this.newTask = '';
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem("list", JSON.stringify(this.TodoList));
  }
  clearTodo() {
    this.TodoList = [];
    this.updateLocalStorage();
  }
  removeTodo(tastToRemove: string) {
    this.TodoList = this.TodoList.filter(todo => todo.task!==tastToRemove);
    this.updateLocalStorage();
  }
  checkTodo(taskToCheck: ToDo) {
    this.updateLocalStorage();
  }
  updateTodo(taskToUpdate: {originalTask: string, newTask: string, check: boolean}) {
    let index = this.TodoList.findIndex(todo => todo.task===taskToUpdate.originalTask);
    this.TodoList[index] = {
      task: taskToUpdate.newTask,
      check: taskToUpdate.check
    };
    this.updateLocalStorage();
  }
}
