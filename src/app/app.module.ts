import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableListerComponent } from './table-lister/table-lister.component';
import {FormGroupName, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { SigninWindowComponent } from './signin-window/signin-window.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { ModalComponent } from './modal/modal.component';
import { SignoutWindowComponent } from './signout-window/signout-window.component';
import { SignoutButtonComponent } from './signout-button/signout-button.component';
import {MatButtonModule} from "@angular/material/button";
import {CookieService} from "ngx-cookie-service";
import {AddCardComponent, TableContentComponent} from './table-content/table-content.component';
import { AddListComponent } from './add-list/add-list.component';
import {MatInputModule} from "@angular/material/input";
import { CardContentComponent } from './card-content/card-content.component';
import { SignupComponent } from './signin-window/signin-window.component';
import { PopupComponent } from './signin-window/signin-window.component';


@NgModule({
  declarations: [
    AppComponent,
    TableListerComponent,
    // TableContentComponent,
    SigninWindowComponent,
    ModalComponent,
    SignoutWindowComponent,
    SignoutButtonComponent,
    TableContentComponent,
    AddListComponent,
    AddCardComponent,
    CardContentComponent,
    SignupComponent,
    PopupComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule
    ],
  providers: [CookieService],

  bootstrap: [AppComponent]
})
export class AppModule { }
