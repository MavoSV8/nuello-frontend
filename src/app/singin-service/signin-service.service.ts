import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "../app.component";
import {OpResult} from "../op-result";

@Injectable({
  providedIn: 'root'
})
export class SigninServiceService {
  //private flaskSignInEP = "https://nuello-back.herokuapp.com/signin"
  private flaskSignInEP = "http://127.0.0.1:5000/signin"
  constructor(private http: HttpClient) {

  }


  validateUser(user: string, pwd: string) : Observable<OpResult> {

    return this.http.get<OpResult>(this.flaskSignInEP, {params: { operation : 'singin', name : user, pwd : pwd},withCredentials:true});
  }
}
