import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SigninServiceService} from "../singin-service/signin-service.service";
import {Table} from "../table";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from "../modal/modal.component";



@Component({
  selector: 'app-signin-window',
  templateUrl: './signin-window.component.html',
  styleUrls: ['./signin-window.component.css']
})
export class SigninWindowComponent implements OnInit {

  singInForm : FormGroup;

  constructor(private singinService : SigninServiceService, public authService : AuthenticationService, public router : Router
              ,private dialog : MatDialog) {
    this.singInForm = new FormGroup({
      name: new FormControl(''),
      pwd: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.singinService.validateUser(this.singInForm.value.name, this.singInForm.value.pwd).subscribe(result => {
      console.log(result)
      if(result.result == 'success')
      {
        this.authService.login(this.singInForm.value.name);
        this.router.navigateByUrl('/main').then(res => {
          if ( !res ) {
            console.log("routing failed");
          } else {
            console.log("routing accepted");
          }
        });
        console.log("OK");
      } else
      {

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '250px',
          data : { text : "Invalid password" }
        });

        console.log("Validation failed");
      }
    },(err:HttpErrorResponse) => {
      console.log("Invalid request");
    });
  }

}
function DialogBodyComponent(DialogBodyComponent: any, dialogConfig: MatDialogConfig<any>) {
    throw new Error('Function not implemented.');
}

