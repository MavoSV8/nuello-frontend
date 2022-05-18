import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpResult} from "../op-result";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  private flaskSignOutEP = "https://nuello-back.herokuapp.com/signout";
  //private flaskSignOutEP = "http://127.0.0.1:5000/signout";
  constructor(private http: HttpClient) { }

  logout() : Observable<OpResult> {
    return this.http.post<OpResult>(this.flaskSignOutEP, {params: { operation : 'singout'}},{withCredentials:true});
  }
}
