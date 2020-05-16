import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from './common-module-imports.module';
import {RepresentanteComponent} from './representante/representante.component';
import {TipoEquipoComponent} from './tipo-equipo/tipo-equipo.component';
import {ModeloEquipoComponent} from './modelo-equipo/modelo-equipo.component';
import {UbicacionComponent} from './ubicacion/ubicacion.component';
import {RepuestoComponent} from './repuesto/repuesto.component';
import {CalendarModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    CalendarModule
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
