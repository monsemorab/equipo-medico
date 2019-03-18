import {NgModule} from '@angular/core';
import {ContratoComponent} from "./contrato.component";

import {AddEditContratoComponent} from "./add-edit-contrato/add-edit-contrato.component";
import {ContratoService} from "../../service/contrato.service";
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import {AddContratoComponent} from './add-contrato/add-contrato.component';
import {ListaContratoComponent} from './lista-contrato/lista-contrato.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    SharedModule
  ],
  exports: [ContratoComponent],
  providers: [ContratoService],
  declarations: [
    ContratoComponent,
    AddEditContratoComponent,
    AddContratoComponent,
    ListaContratoComponent]
})
export class ContratoModule {
}
