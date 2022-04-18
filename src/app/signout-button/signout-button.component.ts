import { Component, OnInit } from '@angular/core';
import {SignoutService} from "../signout-service/signout.service";
import {SigninServiceService} from "../singin-service/signin-service.service";
import {SigninWindowComponent} from "../signin-window/signin-window.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-signout-button',
  templateUrl: './signout-button.component.html',
  styleUrls: ['./signout-button.component.css']
})
export class SignoutButtonComponent implements OnInit {

  constructor(public signoutService: SignoutService, public router : Router
    ,private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.signoutService.logout().subscribe(result => {
      if(result.result == "success"){
        this.router.navigateByUrl("/");
      }
    });
  }

}
