import {NgModule} from '@angular/core';
import {SolicitudRepuestoComponent} from './solicitud-repuesto.component';
import {ListarSolicitudComponent} from './listar-solicitud/listar-solicitud.component';
import {AddSolicitudComponent} from './add-solicitud/add-solicitud.component';
import {EditSolicitudComponent} from './edit-solicitud/edit-solicitud.component';
import {SolicitudRepuestoService} from '../../../service/solicitud-repuesto.service';
import {CommonModuleImportsModule} from '../../../shared/common-module-imports.module';
import {SharedModule} from '../../../shared/shared.module';
import {CalendarModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    CalendarModule,
    SharedModule
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
