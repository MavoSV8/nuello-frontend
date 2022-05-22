import {Injectable} from '@angular/core';
import {Table} from "../table";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpResult} from "../op-result";

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  private tablesHttp = "https://nuello-back.herokuapp.com/tables"
  //private tablesHttp = "http://127.0.0.1:5000/tables"
  private listsHttp = "https://nuello-back.herokuapp.com/lists"
  //private listsHttp = "http://127.0.0.1:5000/lists"
  private cardsHttp = "https://nuello-back.herokuapp.com/cards"
  //private cardsHttp = "http://127.0.0.1:5000/cards"

  constructor(private http: HttpClient) {
  }

  getTables(): Observable<OpResult> {
    return this.http.get<OpResult>(this.tablesHttp,{withCredentials: true});
  }

  getLists(): Observable<OpResult> {
    return this.http.get<OpResult>(this.listsHttp);
  }

  getCards(): Observable<OpResult> {
    return this.http.get<OpResult>(this.cardsHttp);
  }

  postTable(name: string, desc: string): Observable<OpResult> {
    return this.http.post<OpResult>(this.tablesHttp, {params: {name: name, desc: desc}});
  }

  postList(name: string, table_id: number): Observable<OpResult> {
    return this.http.post<OpResult>(this.listsHttp, {params: {name: name, table_id: table_id}});
  }

  postCard(name: string, list_id: number, description: string, assigne: string): Observable<OpResult> {
    return this.http.post<OpResult>(this.cardsHttp, {params: {name: name, description: description, assigne: assigne}});
  }

  deleteList(id: number, table_id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.listsHttp, {params: {id: id, table_id: table_id}})
  }

  deleteCard(id: number, list_id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.cardsHttp, {params: {id: id, list_id: list_id}})
  }

  patchList(id: number, table_id: number): Observable<OpResult> {
    return this.http.patch<OpResult>(this.listsHttp, {params: {id: id, table_id: table_id}})
  }

  patchCard(id: number, list_id: number): Observable<OpResult> {
    return this.http.patch<OpResult>(this.cardsHttp, {params: {id: id, list_id: list_id}})
  }

  getTable(name: string): Observable<Table[]> {
    return this.http.get<Table[]>(this.flaskHttp.concat('/',name))
  }
}
