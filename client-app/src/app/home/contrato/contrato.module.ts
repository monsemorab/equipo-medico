import {NgModule} from '@angular/core';
import {ContratoComponent} from "./contrato.component";

import {AddEditContratoComponent} from "./add-edit-contrato/add-edit-contrato.component";
import {ContratoService} from "../../service/contrato.service";
import {CommonModuleImportsModule} from "../../shared/common-module-imports.module";
import { AddContratoComponent } from './add-contrato/add-contrato.component';

@NgModule({
  imports: [
    CommonModuleImportsModule
  ],
  exports: [ContratoComponent],
  providers: [ContratoService],
  declarations: [
    ContratoComponent,
    AddEditContratoComponent,
    AddContratoComponent]
})
export class ContratoModule {
}
