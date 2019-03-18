import {NgModule} from '@angular/core';

import {SolicitudComponent} from "./solicitud.component";
import {SolicitudService} from "../../../service/solicitud.service";
import {AddOrdenTrabajoComponent} from "../lista-orden-trabajo/add-orden-trabajo/add-orden-trabajo.component";
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
    AddOrdenTrabajoComponent]
})
export class SolicitudModule {
}
