import {NgModule} from '@angular/core';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import 'hammerjs';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ClarityModule, ClrFormsNextModule} from "@clr/angular";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgIdleModule} from "@ng-idle/core";
import {ApiService} from "./service/api.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    ClrFormsNextModule,
    AppRoutingModule,
    NgIdleModule.forRoot(),
    HomeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
