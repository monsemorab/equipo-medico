import {NgModule} from '@angular/core';

import {SolicitudComponent} from "./solicitud.component";
import {SolicitudService} from "../../../service/solicitud.service";
import {AddEditSolicitudServicioComponent} from "./add-edit-solicitud-servicio/add-edit-solicitud-servicio.component";
import {AddOrdenTrabajoComponent} from "./add-orden-trabajo/add-orden-trabajo.component";
import {AddEditSolicitudRepuestoComponent} from "./add-edit-solicitud-repuesto/add-edit-solicitud-repuesto.component";
import {CommonModuleImportsModule} from "../../../shared/common-module-imports.module";

@NgModule({
  imports: [
    CommonModuleImportsModule
  ],
  exports: [SolicitudComponent],
  providers: [
    SolicitudService
  ],
  declarations: [
    SolicitudComponent,
    AddEditSolicitudServicioComponent,
    AddOrdenTrabajoComponent,
    AddEditSolicitudRepuestoComponent]
})
export class SolicitudModule {
}
