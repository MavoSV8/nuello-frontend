import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn : boolean;
  redirectUrl: string | null = null;
  userName : string;
  constructor() {
    this.isLoggedIn = false;
  }

  // no idea how to make it work :)
  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(() => this.isLoggedIn = true)
  //   );
  // }

  login(userName : string): void {
    this.isLoggedIn = true;
    this.userName = userName;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
