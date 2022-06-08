import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SigninServiceService} from "../singin-service/signin-service.service";
import {Table} from "../table";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../authentication-service/authentication.service";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from "../modal/modal.component";
import {SignupServiceService} from "../signup-service/signup-service.service";

let popupmessage: any ;


export interface tempSignup {
  name: string;
  pwd: string;
  // pwd_r: string;
}


@Component({
  selector: 'sign-up-component',
  templateUrl: '../signin-window/sign-up-component.html',
  styleUrls: ['../signin-window/sign-up-component.css']
})
export class SignupComponent {

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: tempSignup) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'popup-component',
  templateUrl: '../signin-window/popup-component.html',
  styleUrls: ['../signin-window/sign-up-component.css']
})
export class PopupComponent {
  popuptitle = popupmessage

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {
  }

  onClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-signin-window',
  templateUrl: './signin-window.component.html',
  styleUrls: ['./signin-window.component.css']
})
export class SigninWindowComponent implements OnInit {

  singInForm: FormGroup;
  signUpForm: FormGroup;


  constructor(private singinService: SigninServiceService, public authService: AuthenticationService, public router: Router
    , private dialog: MatDialog, public dialogSignup: MatDialog, private singupService: SignupServiceService,public popupDialog: MatDialog) {
    this.singInForm = new FormGroup({
      name: new FormControl(''),
      pwd: new FormControl(''),
    });
    this.signUpForm = new FormGroup({
      name: new FormControl(''),
      pwd: new FormControl(''),
      // pwd_r: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log()
    this.singinService.validateUser(this.singInForm.value.name, this.singInForm.value.pwd).subscribe(result => {
      console.log(result)
      if (result.result == 'success') {
        this.authService.login(this.singInForm.value.name);
        this.router.navigateByUrl('/main').then(res => {
          if (!res) {
            console.log("routing failed");
          } else {
            console.log("routing accepted");
          }
        });
        console.log("OK");
      } else {

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '250px',
          data: {text: "Invalid password"}
        });

        console.log("Validation failed");
      }
    }, (err: HttpErrorResponse) => {
      console.log("Invalid request");
    });
  }

  signup(): void {
    console.log("SIGNIN")
    const dialog = this.dialogSignup.open(SignupComponent, {
      width: '250px',
      data: {
        name: this.signUpForm.value.name,
        pwd: this.signUpForm.value.pwd,
        // pwd_r: this.signUpForm.value.pwd_r
      }
    });

    dialog.afterClosed().subscribe(result => {
      // console.log("name = " + result.name)
      // this.signUpForm.value
      if (result != null) {
        if (result.name != "" && result.pwd != "") {
          console.log("jest git Halincia")
          // if pwd == pwd


          this.singupService.addUser(result.name, result.pwd).subscribe(requestResult => {
              console.log(requestResult)
              console.log("whatever")

            if (requestResult.result == 'success') {
              popupmessage = "User created"
              this.popupDialog.open(PopupComponent)
              console.log("user created");
            } else {
              console.log("something went wrong");
            }
            }, (err: HttpErrorResponse) => {
            popupmessage = "User already exists"
            this.popupDialog.open(PopupComponent)
              console.log(err.error)
            }
          );
        }
      }
    })
  }
}


function DialogBodyComponent(DialogBodyComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}


