import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleImportsModule} from "./common-module-imports.module";
import {SolicitudRepuestoModule} from "./solicitud-repuesto/solicitud-repuesto.module";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule
  ],
  declarations: [SolicitudRepuestoModule],
  exports: [SolicitudRepuestoModule]
})
export class SharedModule { }
