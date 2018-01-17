import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ClarityModule} from "@clr/angular";
import {AppRoutingModule} from "./app-routing.module";
import {MantenimientosModule} from "./mantenimientos/mantenimientos.module";

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    AppRoutingModule,
    MantenimientosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
