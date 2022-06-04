import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../card";
import {Comment} from "../comment";
import {HttpErrorResponse} from "@angular/common/http";
import {DbRequestService} from "../message-service/db-request.service";
import {AuthenticationService} from "../authentication-service/authentication.service";

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardContentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Card, private dbRequester : DbRequestService) {}

  card : Card
  errorMsg : string
  comments : Comment[]
  userComment : string
  userName : string

  ngOnInit(): void {
    console.log(this.data)
    this.card = this.data
    this.userComment = ""
    this.whoAmI();
    this.getComments(this.card.id);
  }

  getComments(cardId : number): void {
    this.dbRequester.getComments(cardId).subscribe(comments => {
      if (comments.result == "failure") {
        this.errorMsg = "Could not load comments...";
      } else {
        console.log("Step 2:" + comments);
        this.comments = comments.value;
        this.errorMsg = ""
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
    });
  }

  sendComment() : void {

    if (this.userName == "" || this.userComment == "") {
      this.dialogRef.close()
    } else {
      this.dbRequester.postComment(this.userComment, this.userName, this.card.id).subscribe(comment => {
        if(comment.result == "failure"){

        }else{
          this.userComment = ""
          this.ngOnInit();
        }
      },(err:HttpErrorResponse) => {
        console.log(err)
      });
    }
  }

  whoAmI() : void {
    this.dbRequester.getWhoAmI().subscribe(whoami => {
      if (whoami.result == "failure") {
        this.errorMsg = "Could not load comments...";
        this.userName = ""
      } else {
        console.log("Step 2:" + whoami.value);
        this.userName = whoami.value;
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
    });
  }
}
