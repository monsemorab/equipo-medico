import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from "./common-module-imports.module";
import {RepresentanteComponent} from "./representante/representante.component";
import {TipoEquipoComponent} from "./tipo-equipo/tipo-equipo.component";
import {ModeloEquipoComponent} from "./modelo-equipo/modelo-equipo.component";
import {UbicacionComponent} from "./ubicacion/ubicacion.component";
import {OrdenTrabajoModule} from "./orden-trabajo/orden-trabajo.module";
import {RepuestoComponent} from "./repuesto/repuesto.component";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    OrdenTrabajoModule
  ],
  declarations: [
    RepresentanteComponent,
    TipoEquipoComponent,
    ModeloEquipoComponent,
    UbicacionComponent,
    RepuestoComponent
  ],
  exports: [
    RepresentanteComponent,
    TipoEquipoComponent,
    ModeloEquipoComponent,
    UbicacionComponent,
    RepuestoComponent
  ]
})
export class SharedModule {
}
