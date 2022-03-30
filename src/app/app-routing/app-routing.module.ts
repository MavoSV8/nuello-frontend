import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninWindowComponent} from "../signin-window/signin-window.component";
import {AppGuard} from "../app-guard/app.guard";
import {TableListerComponent} from "../table-lister/table-lister.component";

const routes: Routes = [
  { path: '', component: SigninWindowComponent },
  { path: 'main', component: TableListerComponent, canActivate: [AppGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
