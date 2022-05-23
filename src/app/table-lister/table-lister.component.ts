import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef, Renderer2, RendererFactory2} from '@angular/core';
import { Table } from '../table';
import {DbRequestService} from "../message-service/db-request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SignoutService} from "../signout-service/signout.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-table-lister',
  templateUrl: './table-lister.component.html',
  styleUrls: ['./table-lister.component.css']
})
export class TableListerComponent implements OnInit {
  tables: Table[];

  constructor(private dbRequester : DbRequestService, public signoutService: SignoutService, public router : Router, private cookie : CookieService) {
  }


  ngOnInit(): void {
    this.getTables();
  }

  logout(): void {
    console.log("button works but not logout")

    this.signoutService.logout().subscribe(result => {

      if(result.result == "success"){
        this.router.navigateByUrl("/signedout");
        console.log("button works");
      }
    });
  }

  getTables(): void {
    this.dbRequester.getTables().subscribe(tables => {
      if(tables.result == "failure"){
        this.router.navigateByUrl("/");
      }else{
        console.log(tables.value);

        this.tables = tables.value;
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }
}
