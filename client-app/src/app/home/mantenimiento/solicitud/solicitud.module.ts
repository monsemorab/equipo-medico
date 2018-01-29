import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ClarityModule} from "clarity-angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {SolicitudComponent} from "./solicitud.component";
import {SolicitudService} from "../../../service/solicitud.service";
import {AddEditSolicitudComponent} from "./add-edit-solicitud/add-edit-solicitud.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [SolicitudComponent],
  providers: [
    SolicitudService
  ],
  declarations: [
    SolicitudComponent,
    AddEditSolicitudComponent]
})
export class SolicitudModule {
}
