import {NgModule} from '@angular/core';
import {MantenimientoComponent} from "./mantenimiento.component";
import {SolicitudModule} from "./solicitud/solicitud.module";
import {ListaOrdenTrabajoComponent} from "./lista-orden-trabajo/lista-orden-trabajo.component";
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import { SolicitudRepuestoComponent } from '../../shared/solicitud-repuesto/solicitud-repuesto.component';


@NgModule({
  imports: [
    CommonModuleImportsModule,
    SolicitudModule
  ],
  exports: [MantenimientoComponent],
  declarations: [
    MantenimientoComponent,
    ListaOrdenTrabajoComponent,
    SolicitudRepuestoComponent]
})
export class MantenimientoModule {
}
