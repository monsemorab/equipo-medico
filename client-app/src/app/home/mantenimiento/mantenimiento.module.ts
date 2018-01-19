import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ClarityModule} from "clarity-angular";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

import {MantenimientoComponent} from "./mantenimiento.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [MantenimientoComponent],
  declarations: [MantenimientoComponent]
})
export class MantenimientoModule {
}
