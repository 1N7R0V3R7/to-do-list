import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from '../ToDo.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() todoItem: ToDo;
  @Output() remove = new EventEmitter<string>();
  @Output() check = new EventEmitter<ToDo>();
  @Output() update = new EventEmitter<{originalTask: string, newTask: string, check: boolean}>();
  updateFlag: boolean = false;
  updatedTask: string;
  
  constructor() {}

  ngOnInit(): void {
  }
  removeTask(event: any) {
    this.remove.emit(this.todoItem.task);
  }
  checkTask(event: any) {
    this.todoItem.check = !this.todoItem.check;
    this.check.emit(this.todoItem);
  }
  triggerUpdate(event: any) {
    this.updateFlag = !this.updateFlag;
    this.updatedTask = this.todoItem.task
  }
  getNewTask(event: any) {
    this.todoItem.task = this.updatedTask;
  }
  updateTask(event: any) {
    this.updateFlag = !this.updateFlag;
    this.update.emit({
      originalTask: this.todoItem.task,
      newTask: this.updatedTask,
      check: this.todoItem.check
    });
  }
}
