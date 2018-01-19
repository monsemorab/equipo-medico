import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ClarityModule} from "clarity-angular";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {EquipoModule} from "./equipo/equipo.module";
import {ContratoModule} from "./contrato/contrato.module";
import {MantenimientoModule} from "./mantenimiento/mantenimiento.module";

import {HomeComponent} from "./home.component";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    EquipoModule,
    ContratoModule,
    MantenimientoModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
