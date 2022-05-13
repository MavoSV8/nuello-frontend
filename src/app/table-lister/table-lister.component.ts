import { Component, OnInit } from '@angular/core';
import { Table } from '../table';
import {DbRequestService} from "../message-service/db-request.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {SignoutButtonComponent} from "../signout-button/signout-button.component";
import {SignoutService} from "../signout-service/signout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-lister',
  templateUrl: './table-lister.component.html',
  styleUrls: ['./table-lister.component.css']
})
export class TableListerComponent implements OnInit {
  tables: Table[] =  [];

  constructor(private dbRequester : DbRequestService, public signoutService: SignoutService, public router : Router ) {
  }

  ngOnInit(): void {
    this.getTables();
  }

  logout() : void {

    this.signoutService.logout().subscribe(result => {
      if(result.result == "success"){
        this.router.navigateByUrl("/signedout");
        console.log("button works");
      }
    });
  }

  getTables() : void {
    this.dbRequester.getTables().subscribe(tables => {
      console.log(tables)
      this.tables = <Table[]> tables;
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }

}
