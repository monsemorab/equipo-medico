import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleImportsModule} from "../common-module-imports.module";
import {SolicitudRepuestoComponent} from "./solicitud-repuesto.component";
import {AddEditSolicitudRepuestoComponent} from "./add-edit-solicitud-repuesto/add-edit-solicitud-repuesto.component";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule
  ],
  exports: [SolicitudRepuestoComponent],
  declarations: [
    SolicitudRepuestoComponent,
    AddEditSolicitudRepuestoComponent
  ]
})
export class SolicitudRepuestoModule { }
