import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ClarityModule} from "@clr/angular";
import {MantenimientosComponent} from "./mantenimientos.component";
import {EquipoModule} from "./equipo/equipo.module";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    EquipoModule
  ],
  exports: [
    MantenimientosComponent
  ],
  providers: [],
  declarations: [
    MantenimientosComponent
  ]
})
export class MantenimientosModule {
}
