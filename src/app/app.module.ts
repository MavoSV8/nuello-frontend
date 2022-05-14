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
import {TableContentComponent} from "./table-content/table-content.component";

@NgModule({
  declarations: [
    AppComponent,
    TableListerComponent,
    TableContentComponent,
    SigninWindowComponent,
    ModalComponent,
    SignoutWindowComponent,
    SignoutButtonComponent,
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
        MatButtonModule
    ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
