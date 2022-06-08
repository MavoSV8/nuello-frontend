import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../card";
import {Task} from "../task";
import {Comment} from "../comment";
import {HttpErrorResponse} from "@angular/common/http";
import {DbRequestService} from "../message-service/db-request.service";



@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CardContentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Card, private dbRequester : DbRequestService) {}

  ON_HOLD = "ON_HOLD"
  IN_PROGRESS = "IN_PROGRESS"
  DONE = "DONE"
  card : Card
  errorMsg : string
  comments : Comment[]
  userComment : string
  userName : string
  tasks : Task[] //[{id: 0, status : "DONE", content : "Something to do"}, {id: 0, status: "IN_PROGRESS", content : "Something else to do"}, {id: 0, status : "ON_HOLD", content : "Something to do"}]
  addingTask = false
  changingDesc = false
  changingName = false
  userTaskInput = ""


  ngOnInit(): void {
    console.log(this.data)
    this.card = this.data
    this.userComment = ""
    this.whoAmI();
    this.getComments(this.card.id);
    this.getTasks(this.card.id);
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

  getTasks(cardId : number): void {
    this.dbRequester.getTasks(cardId).subscribe(tasks => {
      if (tasks.result == "failure") {
        this.errorMsg = "Could not load comments...";
      } else {
        console.log("Step 2:" + tasks);
        this.tasks = tasks.value.sort(function (task1, task2) {
          if ( task1.id > task2.id)
          {
            return 1
          } else {
            return -1
          }
        });
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

  changeStatus(i : number) {
    switch (this.tasks[i].status) {
      case this.DONE:
        this.tasks[i].status = this.ON_HOLD;
        break;
      case this.ON_HOLD:
        this.tasks[i].status = this.IN_PROGRESS;
        break;
      case this.IN_PROGRESS:
        this.tasks[i].status = this.DONE;
        break;
    }


    this.dbRequester.patchTask(this.tasks[i].id, this.tasks[i].card_id, this.tasks[i].content, this.tasks[i].status,).subscribe(comment => {
        if(comment.result == "failure"){

        }else{
          this.userComment = ""
          this.ngOnInit();
        }
      },(err:HttpErrorResponse) => {
        console.log(err)
      });
  }

  addTask() {
    this.dbRequester.postTask(this.userTaskInput, this.card.id, this.IN_PROGRESS).subscribe(task => {
      if(task.result == "failure"){

      }else{
        this.userTaskInput = ""
        this.addingTask = false
        this.ngOnInit();
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }

  deleteTask(i : number) {
    this.dbRequester.deleteTask(this.tasks[i].id).subscribe(task => {
      if(task.result == "failure"){

      }else{
        this.ngOnInit();
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }

  deleteComment(i : number) {
    this.dbRequester.deleteComment(this.comments[i].id).subscribe(comment => {
      if(comment.result == "failure"){

      }else{
        this.ngOnInit();
      }
    },(err:HttpErrorResponse) => {
      console.log(err)
    });
  }

  showTaskAddingField() {
    this.addingTask = true
  }

  onFocusOut(event: any){
    let tempAssignee = event.target.value;
    if(tempAssignee !== this.card.assigne){
      this.dbRequester.patchCardAssignee(this.card.id,this.card.list_id,tempAssignee).subscribe(result => {
        if(result.result == "failure"){
          event.target.value = this.card.assigne;
        }
        else {
          this.card.assigne = tempAssignee;
        }

      })

    }
  }

}
