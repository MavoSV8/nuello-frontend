import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninWindowComponent} from "../signin-window/signin-window.component";
import {AppGuard} from "../app-guard/app.guard";
import {TableListerComponent} from "../table-lister/table-lister.component";
import {SignoutButtonComponent} from "../signout-button/signout-button.component";
import {SignoutWindowComponent} from "../signout-window/signout-window.component";
import {TableContentComponent} from "../table-content/table-content.component";

const routes: Routes = [
  { path: '', component: SigninWindowComponent },
  { path: 'signedout', component: SignoutWindowComponent },
  //{ path: 'main', component: TableListerComponent, canActivate: [AppGuard] }
  { path: 'main', component: TableListerComponent } ,
  { path: 'table', component: TableContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
