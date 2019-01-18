import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private _http: Http) { }

  getData() {
    return this._http.get(`/api/all`).pipe(map(res => res.json()));
  }

  deleteItem(id) {
    return this._http.delete(`/api/${id}`).pipe(map(res => res.json()));
  }

  createItem(message) {
    return this._http.post('/api/create' , { message: message } ).pipe(map(res => res.json()));
  }
}
