import {Injectable} from '@angular/core';
import {Table} from "../table";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpResult} from "../op-result";
import {Comment} from "../comment"
import {StringOpResult} from "../string-op-result";

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  private tablesHttp = "https://nuello-back.herokuapp.com/tables"
  // private tablesHttp = "http://127.0.0.1:5000/tables"
  private listsHttp = "https://nuello-back.herokuapp.com/lists"
  // private listsHttp = "http://127.0.0.1:5000/lists"
  private cardsHttp = "https://nuello-back.herokuapp.com/cards"
  // private cardsHttp = "http://127.0.0.1:5000/cards"
  private commentsHttp = "https://nuello-back.herokuapp.com/comments"
  // private commentsHttp = "http://127.0.0.1:5000/comments"
  private whoAmIHttp = "https://nuello-back.herokuapp.com/whoami"
  // private whoAmIHttp = "http://127.0.0.1:5000/whoami"
  private tasksHttp = "https://nuello-back.herokuapp.com/tasks"
  // private tasksHttp = "http://127.0.0.1:5000/tasks"

  constructor(private http: HttpClient) {
  }

  getTables(): Observable<OpResult> {
    return this.http.get<OpResult>(this.tablesHttp,{withCredentials: true});
  }

  getLists(tableId : number): Observable<OpResult> {
    return this.http.get<OpResult>(this.listsHttp, { params : { table_id: tableId }, withCredentials : true});
  }

  getCards(listId : number): Observable<OpResult> {
    return this.http.get<OpResult>(this.cardsHttp, { params : { list_id: listId }, withCredentials : true});
  }

  getComments(cardId : number): Observable<OpResult> {
    return this.http.get<OpResult>(this.commentsHttp, { params : { card_id: cardId }, withCredentials : true});
  }

  getTasks(cardId : number): Observable<OpResult> {
    return this.http.get<OpResult>(this.tasksHttp, { params : { card_id: cardId }, withCredentials : true});
  }
  getWhoAmI(): Observable<StringOpResult> {
    return this.http.get<StringOpResult>(this.whoAmIHttp, { params : { }, withCredentials : true});
  }

  postTable(name: string, desc: string): Observable<OpResult> {
    return this.http.post<OpResult>(this.tablesHttp, {name: name, desc: desc}, {withCredentials: true});
  }

  postList(name: string, table_id: number): Observable<OpResult> {
    return this.http.post<OpResult>(this.listsHttp, "", {withCredentials: true, params:{name:name,table_id:table_id}});
  }

  postTask(content: string, cardId: number, status: string): Observable<OpResult> {
    return this.http.post<OpResult>(this.tasksHttp, "", {withCredentials: true, params:{content:content,card_id:cardId, status: status}});
  }

  postComment(content: string, author: string, cardId: number): Observable<OpResult> {
    return this.http.post<OpResult>(this.commentsHttp, "", {withCredentials: true, params:{content : content, author: author, card_id: cardId }});
  }

  postCard(name: string, list_id: number, description: string, assigne: string): Observable<OpResult> {
    return this.http.post<OpResult>(this.cardsHttp,"", {withCredentials: true, params: {name: name, list_id: list_id ,description: description, assigne: assigne}} );
  }

  deleteList(id: number, table_id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.listsHttp, {params: {id: id, table_id: table_id}, withCredentials: true})
  }

  deleteCard(id: number, list_id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.cardsHttp, {params: {id: id, list_id: list_id}, withCredentials: true})
  }

  deleteTask(id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.tasksHttp, {params: {id: id }, withCredentials: true})
  }

  deleteComment(id: number): Observable<OpResult> {
    return this.http.delete<OpResult>(this.commentsHttp, {params: {id: id }, withCredentials: true})
  }

  patchList(id: number, table_id: number): Observable<OpResult> {
    return this.http.patch<OpResult>(this.listsHttp, {params: {id: id, table_id: table_id}})
  }

  patchCardAssignee(id: number, list_id: number, assigne: string): Observable<OpResult> {
    return this.http.patch<OpResult>(this.cardsHttp, {id: id, list_id: list_id, assigne: assigne},{withCredentials:true})
  }
  patchCardDescription(id: number, list_id: number, description: string): Observable<OpResult> {
    return this.http.patch<OpResult>(this.cardsHttp, {id: id, list_id: list_id, description: description},{withCredentials:true})
  }

  patchTask(id: number, cardId: number, content: string, status: string): Observable<OpResult> {
    return this.http.patch<OpResult>(this.tasksHttp, "", {withCredentials: true, params:{id : id, card_id: cardId, content: content, status: status}});
  }
  // getTable(name: string): Observable<Table[]> {
  //   return this.http.get<Table[]>(this.flaskHttp.concat('/',name))
  // }
}
