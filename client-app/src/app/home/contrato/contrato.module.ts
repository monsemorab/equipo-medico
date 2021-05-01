import {NgModule} from '@angular/core';
import {ContratoComponent} from './contrato.component';

import {ContratoService} from '../../service/contrato.service';
import {CommonModuleImportsModule} from '../../shared/common-module-imports.module';
import {AddContratoComponent} from './add-contrato/add-contrato.component';
import {ListaContratoComponent} from './lista-contrato/lista-contrato.component';
import {SharedModule} from '../../shared/shared.module';
import {EditContratoComponent} from './edit-contrato/edit-contrato.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    SharedModule,
    TableModule,
    ButtonModule
  ],
  exports: [ContratoComponent],
  providers: [ContratoService],
  declarations: [
    ContratoComponent,
    AddContratoComponent,
    ListaContratoComponent,
    EditContratoComponent]
})
export class ContratoModule {
}
