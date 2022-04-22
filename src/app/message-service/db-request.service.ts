import { Injectable } from '@angular/core';
import {Table} from "../table";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  private flaskHttp = "https://nuello-back.herokuapp.com/tables"

  constructor(private http: HttpClient) { }

  getTables() : Observable<Table[]> {
    return this.http.get<Table[]>(this.flaskHttp)
  }

  getTable(name: string): Observable<Table[]> {
    return this.http.get<Table[]>(this.flaskHttp.concat('/',name))
  }
}
