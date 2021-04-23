import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from './common-module-imports.module';
import {RepresentanteComponent} from './representante/representante.component';
import {TipoEquipoComponent} from './tipo-equipo/tipo-equipo.component';
import {UbicacionComponent} from './ubicacion/ubicacion.component';
import {SolicitudRepuestoDetalleComponent} from "./solicitud-detalle/solicitud-repuesto-detalle/solicitud-repuesto-detalle.component";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule
  ],
  declarations: [
    RepresentanteComponent,
    TipoEquipoComponent,
    UbicacionComponent,
    SolicitudRepuestoDetalleComponent
  ],
  exports: [
    RepresentanteComponent,
    TipoEquipoComponent,
    UbicacionComponent,
    SolicitudRepuestoDetalleComponent
  ]
})
export class SharedModule {
}
