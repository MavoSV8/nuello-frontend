import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef, Renderer2, RendererFactory2} from '@angular/core';
import { Table } from '../table';
import {DbRequestService} from "../message-service/db-request.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {SignoutButtonComponent} from "../signout-button/signout-button.component";
import {SignoutService} from "../signout-service/signout.service";
import {Router} from "@angular/router";
import {TableContentComponent} from "../table-content/table-content.component";

// import {ViewContainerRef} from '@angular/core';



@Component({
  selector: 'app-table-lister',
  templateUrl: './table-lister.component.html',
  styleUrls: ['./table-lister.component.css']
})
export class TableListerComponent implements OnInit {
  tables: Table[] = [];
  table: Table[] = []
  // private renderer : Renderer2
  // private rendererFactory: RendererFactory2;



  ngOnInit(): void {
    this.getTables();
  }


  @ViewChild('appenHere', {static : false, read : ViewContainerRef}) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  constructor(private dbRequester: DbRequestService, public signoutService: SignoutService, public router: Router,private viewContainerRef: ViewContainerRef) {
    // this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  logout(): void {
    console.log("button works but not logout")
}
    this.signoutService.logout().subscribe(result => {
      if (result.result == "success") {
        this.router.navigateByUrl("/signedout");
        console.log("button works");
      }
    });
  }

  getTables(): void {
    this.dbRequester.getTables().subscribe(tables => {
      console.log(tables)
      this.tables = <Table[]>tables;
      // this.crea
    }, (err: HttpErrorResponse) => {
      console.log(err)
    });
  }


  getTable(tableName: string) {

    // var tableContentName = tableName+ '-content'
    // var el = document.getElementById(tableContentName);
    // //
    var tableContentName = tableName+ '-content'
    var el = document.getElementById("content");


    if (el != null) {
      console.log("exists");
      el.remove();
      //TODO refresh content
    }
      console.log("not EXISTS")
      this.dbRequester.getTable(tableName).subscribe(table => {
        console.log(table)
        this.table = <Table[]>table;
        let childComponent = this.viewContainerRef.createComponent(TableContentComponent);
        // let childComponent = this.target.createComponent(TableContentComponent);

        childComponent.instance.tableName = tableName;
        childComponent.instance.table = this.table;
        // this.target.createComponent(TableContentComponent)
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });


    // if (el != null) {
    //   console.log("exists");
    //   el.remove();
    //   //TODO refresh content
    // } else {
    //   console.log("not EXISTS")
    //   this.dbRequester.getTable(tableName).subscribe(table => {
    //     console.log(table)
    //     this.table = <Table[]>table;
    //     let childComponent = this.viewContainerRef.createComponent(TableContentComponent);
    //     // let childComponent = this.target.createComponent(TableContentComponent);
    //
    //     childComponent.instance.tableName = tableName;
    //     // this.target.createComponent(TableContentComponent)
    //   }, (err: HttpErrorResponse) => {
    //     console.log(err)
    //   });
    // }












    // this.dbRequester.getTable(tableName).subscribe(table => {
    //   console.log(table)
    //   this.table = <Table[]>table;
    //   let childComponent = this.viewContainerRef.createComponent(TableContentComponent);
    //   childComponent.instance.tableName = tableName;
    //
    // }, (err: HttpErrorResponse) => {
    //   console.log(err)
    // });
  }

}
