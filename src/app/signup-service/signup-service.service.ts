import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";
import {OpResult} from "../op-result";

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  private flaskSignInEP = "https://nuello-back.herokuapp.com/signup"
  // private flaskSignInEP = "http://127.0.0.1:5000/signup"
  constructor(private http: HttpClient) {

  }


  addUser(user: string, pwd: string) : Observable<OpResult> {

    return this.http.post<OpResult>(this.flaskSignInEP, { operation : "signup", name : user, pwd : pwd});
  }
}
