import {NgModule} from '@angular/core';
import {EquipoModule} from "./equipo/equipo.module";
import {ContratoModule} from "./contrato/contrato.module";
import {MantenimientoModule} from "./mantenimiento/mantenimiento.module";

import {HomeComponent} from "./home.component";
import {CommonModuleImportsModule} from "../shared/common-module-imports.module";
import {ApiRequestService} from "../service/api-request.service";


@NgModule({
  imports: [
    CommonModuleImportsModule,
    EquipoModule,
    ContratoModule,
    MantenimientoModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    ApiRequestService
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
