import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ContratoComponent} from "./contrato.component";
import {ClarityModule} from "clarity-angular";

import {AddEditContratoComponent} from "./add-edit-contrato/add-edit-contrato.component";
import {ContratoService} from "../../service/contrato.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [ContratoComponent],
  providers: [ContratoService],
  declarations: [
    ContratoComponent,
    AddEditContratoComponent]
})
export class ContratoModule {
}
