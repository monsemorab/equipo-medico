import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from "./common-module-imports.module";
import {SolicitudRepuestoModule} from "./solicitud-repuesto/solicitud-repuesto.module";
import {RepresentanteComponent} from "./representante/representante.component";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    SolicitudRepuestoModule
  ],
  declarations: [
    RepresentanteComponent
  ],
  exports: [
    RepresentanteComponent
  ]
})
export class SharedModule {
}
