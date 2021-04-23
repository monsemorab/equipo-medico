import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import {InformeContratosComponent} from "./informe-contratos/informe-contratos.component";
import {InformeEquiposComponent} from "./informe-equipos/informe-equipos.component";
import {InformeRepuestosComponent} from "./informe-repuestos/informe-repuestos.component";
import {InformesComponent} from "./informes.component";



@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule
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
