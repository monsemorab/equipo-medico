import {NgModule} from '@angular/core';
import {MantenimientoComponent} from './mantenimiento.component';
import {CommonModuleImportsModule} from '../../shared/common-module-imports.module';
import {SharedModule} from '../../shared/shared.module';
import {OrdenTrabajoModule} from './orden-trabajo/orden-trabajo.module';
import {SolicitudRepuestoModule} from './solicitud-repuesto/solicitud-repuesto.module';
import {RepuestoModule} from "./repuestos/repuesto.module";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    OrdenTrabajoModule,
    SolicitudRepuestoModule,
    SharedModule,
    RepuestoModule
  ],
  exports: [MantenimientoComponent],
  declarations: [
    MantenimientoComponent
  ],
})
export class MantenimientoModule {
}
