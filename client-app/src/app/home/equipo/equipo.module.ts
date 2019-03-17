import {NgModule} from '@angular/core';
import {EquipoComponent} from "./equipo.component";
import {EquipoService} from "../../service/equipo.service";

import {AddEditEquipoComponent} from "./add-edit-equipo/add-edit-equipo.component";
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import {DropdownModule} from "primeng/primeng";


@NgModule({
  imports: [
    CommonModuleImportsModule,
    DropdownModule
  ],
  exports: [EquipoComponent],
  providers: [EquipoService],
  declarations: [
    EquipoComponent,
    AddEditEquipoComponent]
})
export class EquipoModule {
}
