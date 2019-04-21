import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from "./common-module-imports.module";
import {SolicitudRepuestoModule} from "./solicitud-repuesto/solicitud-repuesto.module";
import {RepresentanteComponent} from "./representante/representante.component";
import {TipoEquipoComponent} from "./tipo-equipo/tipo-equipo.component";
import {ModeloEquipoComponent} from "./modelo-equipo/modelo-equipo.component";
import {UbicacionComponent} from "./ubicacion/ubicacion.component";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    SolicitudRepuestoModule
  ],
  declarations: [
    RepresentanteComponent,
    TipoEquipoComponent,
    ModeloEquipoComponent,
    UbicacionComponent
  ],
  exports: [
    RepresentanteComponent,
    TipoEquipoComponent,
    ModeloEquipoComponent,
    UbicacionComponent
  ]
})
export class SharedModule {
}
