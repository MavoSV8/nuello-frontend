import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SignoutService} from "../signout-service/signout.service";
import {DbRequestService} from "../message-service/db-request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TableData} from "../table-data";
import {List} from "../list";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

import {Card} from "../card";
import {ListData} from "../list-data";
import {AddListComponent} from "../add-list/add-list.component";
export interface tempCard{
  name: string;
  description: string;

}

export interface tempList{
  name: string;
}


@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})


export class TableContentComponent implements OnInit {
  tableData = {} as unknown as TableData;
  tempCard : tempCard;
  cardToAdd = {} as unknown as Card;
  listToAdd = {} as unknown as List;
  listDataToAdd = {} as unknown as ListData;
  name: string;
  description: string;
  counter = 40;

  constructor(private dbRequester : DbRequestService, private route: ActivatedRoute, private router: Router, public signoutService: SignoutService, public dialogCard: MatDialog) {
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


    this.signoutService.logout().subscribe(result => {

      if(result.result == "success"){
        this.router.navigateByUrl("/signedout");
        console.log("button works");
      }
    });
  }
  getTables(): void {
    this.router.navigateByUrl('/main').then(res => {
      if ( !res ) {

        console.log("routing failed");
      } else {
        console.log("routing accepted");
      }
    });
  }
  addCard(indexList : number) : void{
    const dialog = this.dialogCard.open(AddCardComponent,{
      width: '300px',
      data: {name: this.name, description : this.description}
    });
    dialog.afterClosed().subscribe(result =>{
      if(result != null){
        this.tempCard = result;
        this.dbRequester.postCard(this.tempCard.name,this.tableData.lists[indexList].listData.id,this.tempCard.description,"admin").subscribe(cards => {
        if(cards.result == "failure"){
          this.router.navigateByUrl("/");
        }else{
          this.ngOnInit();
        }
      },(err:HttpErrorResponse) => {
        console.log(err)
      });

      }

    })
  }

  deleteCard(indexCard : number, indexList : number) : void{

    this.dbRequester.deleteCard(this.tableData.lists[indexList].cards[indexCard].id,this.tableData.lists[indexList].cards[indexCard].list_id).subscribe(card => {
      if(card.result == "failure"){
        this.router.navigateByUrl("/");
      }
      else{
        this.ngOnInit();
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });

  }
  deleteList(index: number) : void{

    console.log("delete list button works");
    this.dbRequester.deleteList(this.tableData.lists[index].listData.id,this.tableData.tableId).subscribe(list => {
      if(list.result == "failure"){
        this.router.navigateByUrl("/");
      }
      else{
        this.ngOnInit();
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });

  }
  addList() : void{
    console.log("add list button works");
    const dialog = this.dialogCard.open(AddListComponent,{
      width: '300px',
      data: {name: this.name}
    });

    dialog.afterClosed().subscribe(result => {
      if(result != null){
        this.dbRequester.postList(result,this.tableData.tableId).subscribe(lists => {
          if(lists.result == "failure"){
            this.router.navigateByUrl("/");
          }else{
            this.ngOnInit();
          }
        },(err:HttpErrorResponse) => {
          console.log(err)
        });

      }


    })

  }


}

@Component({
  selector: 'app-add-card',
  templateUrl: '../table-content/add-card.component.html',
  styleUrls: ['../table-content/add-card.component.css']
})
export class AddCardComponent {

  constructor(public dialogRef: MatDialogRef<AddCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: tempCard) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
