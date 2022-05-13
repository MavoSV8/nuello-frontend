import { Injectable } from '@angular/core';
import {Table} from "../table";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  private flaskHttp = "https://nuello-back.herokuapp.com/tables"
  //private flaskHttp = "http://127.0.0.1:5000/tables"

  constructor(private http: HttpClient) { }

  getTables() : Observable<Table[]> {
    return this.http.get<Table[]>(this.flaskHttp)
  }
}
