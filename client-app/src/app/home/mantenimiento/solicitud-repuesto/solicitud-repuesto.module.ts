import {NgModule} from '@angular/core';
import {SolicitudRepuestoComponent} from './solicitud-repuesto.component';
import {ListarSolicitudComponent} from './listar-solicitud/listar-solicitud.component';
import {AddSolicitudComponent} from './add-solicitud/add-solicitud.component';
import {EditSolicitudComponent} from './edit-solicitud/edit-solicitud.component';
import {SolicitudRepuestoService} from '../../../service/solicitud-repuesto.service';
import {CommonModuleImportsModule} from '../../../shared/common-module-imports.module';
import {SharedModule} from '../../../shared/shared.module';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    SharedModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    SolicitudRepuestoComponent,
    ListarSolicitudComponent,
    AddSolicitudComponent,
    EditSolicitudComponent
  ],
  exports: [
    SolicitudRepuestoComponent,
    ListarSolicitudComponent,
    AddSolicitudComponent,
    EditSolicitudComponent
  ],
  providers: [
    SolicitudRepuestoService
  ],
})
export class SolicitudRepuestoModule {
}
