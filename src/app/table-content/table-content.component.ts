import {Component, OnInit} from "@angular/core";
import { Table } from '../table';


@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnInit {

  tableName = ""
  table : Table[] = []

  constructor() {
    // this.tableName = this.tableName.concat("-content")

     }

  ngOnInit() {
    console.log(this.tableName)
  }
  // addComponent(){
  //   appenHere
  // }

}
