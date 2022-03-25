import { Component, OnInit } from '@angular/core';
import { Table } from '../table';
import {DbRequestService} from "../message-service/db-request.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-table-lister',
  templateUrl: './table-lister.component.html',
  styleUrls: ['./table-lister.component.css']
})
export class TableListerComponent implements OnInit {
  tables: Table[] =  [{id: 0, name : "Null table"}];

  constructor(private dbRequester : DbRequestService) {
  }

  ngOnInit(): void {
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
