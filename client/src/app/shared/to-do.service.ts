import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  URL = 'http://backend:8000/api/all/';
  constructor(private _http: Http) { }

  getData() {
    return this._http.get(this.URL).pipe(map(res => res.json()));
  }

  deleteItem(id) {
    return this._http.delete(`${this.URL}/${id} `).pipe(map(res => res.json()));
  }

  createItem(message) {
    return this._http.post(this.URL , { message } ).pipe(map(res => res.json()));
  }
}