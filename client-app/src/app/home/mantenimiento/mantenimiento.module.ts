import {NgModule} from '@angular/core';
import {MantenimientoComponent} from "./mantenimiento.component";
import {SolicitudModule} from "./solicitud/solicitud.module";
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import {SharedModule} from "../../shared/shared.module";
import {SolicitudRepuestoModule} from "./solicitud-repuesto/solicitud-repuesto.module";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    SolicitudModule,
    SolicitudRepuestoModule,
    SharedModule
  ],
  exports: [MantenimientoComponent],
  declarations: [
    MantenimientoComponent]
})
export class MantenimientoModule {
}
