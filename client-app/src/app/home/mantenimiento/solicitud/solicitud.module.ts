import {NgModule} from '@angular/core';

import {SolicitudComponent} from "./solicitud.component";
import {SolicitudServicioService} from "../../../service/solicitud-servicio.service";
import {CommonModuleImportsModule} from "../../../shared/common-module-imports.module";
import {AddSolicitudServicioComponent} from './add-solicitud-servicio/add-solicitud-servicio.component';
import {EditSolicitudServicioComponent} from './edit-solicitud-servicio/edit-solicitud-servicio.component';
import {ListaSolicitudServicioComponent} from './lista-solicitud-servicio/lista-solicitud-servicio.component';
import {OrdenTrabajoModule} from "../../../shared/orden-trabajo/orden-trabajo.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    OrdenTrabajoModule,
    SharedModule
  ],
  exports: [SolicitudComponent],
  providers: [
    SolicitudServicioService
  ],
  declarations: [
    SolicitudComponent,
    AddSolicitudServicioComponent,
    EditSolicitudServicioComponent,
    ListaSolicitudServicioComponent]
})
export class SolicitudModule {
}
