import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import {CalendarModule} from "primeng/primeng";
import {InformeContratosComponent} from "./informe-contratos/informe-contratos.component";
import {InformeEquiposComponent} from "./informe-equipos/informe-equipos.component";
import {InformeRepuestosComponent} from "./informe-repuestos/informe-repuestos.component";
import {InformesComponent} from "./informes.component";
import {TableModule} from "primeng/table";



@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    CalendarModule,
    TableModule
  ],
  exports: [InformesComponent],
  providers: [],
  declarations: [
    InformesComponent,
    InformeContratosComponent,
    InformeEquiposComponent,
    InformeRepuestosComponent
  ]
})
export class InformesModule { }
