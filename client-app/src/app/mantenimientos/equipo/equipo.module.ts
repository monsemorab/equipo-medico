import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipoComponent} from "./equipo.component";
import {EquipoService} from "../../service/equipo.service";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {ClarityModule} from "@clr/angular";
import {AddEditEquipoComponent} from "./add-edit-equipo/add-edit-equipo.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [EquipoComponent],
  providers: [EquipoService],
  declarations: [
    EquipoComponent,
    AddEditEquipoComponent]
})
export class EquipoModule {
}
