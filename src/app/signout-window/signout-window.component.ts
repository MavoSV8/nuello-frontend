import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-signout-window',
  templateUrl: './signout-window.component.html',
  styleUrls: ['./signout-window.component.css']
})
export class SignoutWindowComponent implements OnInit {

  constructor(public router : Router , private cookies: CookieService) { }

  ngOnInit(): void {

    setTimeout(() =>
      {
        this.router.navigateByUrl('/'
        );
      },
      5000);
  }

}
