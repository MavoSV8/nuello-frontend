import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SignoutService} from "../signout-service/signout.service";
import {DbRequestService} from "../message-service/db-request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TableData} from "../table-data";
import {List} from "../list";

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnInit {
  tableData = {} as unknown as TableData;


  constructor(private dbRequester : DbRequestService, private route: ActivatedRoute, private router: Router, public signoutService: SignoutService,) {
  }

  ngOnInit() {
    this.tableData.lists = []
    this.route.queryParams.subscribe(params => {
      this.tableData.tableId = Number(params['tableId']);
      this.tableData.tableName = params['tableName'];
      console.log( "Step 1:" + this.tableData.tableId);
      this.getLists(this.tableData.tableId);
    });

    // load table data

    console.log()
  }

  getLists(tableId : number): void {
    this.dbRequester.getLists(tableId).subscribe(lists => {
      if(lists.result == "failure"){
        this.router.navigateByUrl("/");
      }else{
        console.log( "Step 2:" + lists.value);
        lists.value.forEach(list => {
          this.tableData.lists.push({listData : list, cards : []});
        })
        this.tableData.lists.forEach(list => {
          list.cards = [];
        })
        this.tableData.lists.forEach(list => {
          this.getCards(list.listData.id);
        })

      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }

  getCards(listId : number): void {
    this.dbRequester.getCards(listId).subscribe(cards => {
      if(cards.result == "failure"){
        this.router.navigateByUrl("/");
      }else{
        console.log(cards.value);

        for(let i=0; i<this.tableData.lists.length; i++)
        {
          if (this.tableData.lists[i].listData.id == listId)
          {
            this.tableData.lists[i].cards = cards.value;
          }
        }
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
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
}
