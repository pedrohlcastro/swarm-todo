import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../shared/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  todoItens = [];
  newItem = '';

  constructor(private todoService: ToDoService) { }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.todoService.getData()
      .subscribe(res => {
        this.todoItens = res;
      });
  }

  deleteItem(id) {
    this.todoService.deleteItem(this.todoItens[id]._id)
      .subscribe(res => this.getAllData());
  }

  createItem(newItem) {
    this.todoService.createItem(newItem.toString())
      .subscribe(res => {
        this.getAllData();
      });
  }

}
