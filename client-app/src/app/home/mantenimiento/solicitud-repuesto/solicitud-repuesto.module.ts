import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonModuleImportsModule} from "../../../shared/common-module-imports.module";
import {SolicitudRepuestoComponent} from "./solicitud-repuesto.component";
import {AddSolicitudRepuestoComponent} from './add-solicitud-repuesto/add-solicitud-repuesto.component';
import {EditSolicitudRepuestoComponent} from './edit-solicitud-repuesto/edit-solicitud-repuesto.component';
import {ListaSolicitudRepuestoComponent} from "./lista-solicitud-repuesto/lista-solicitud-repuesto.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CommonModuleImportsModule,
    SharedModule
  ],
  exports: [SolicitudRepuestoComponent],
  declarations: [
    SolicitudRepuestoComponent,
    ListaSolicitudRepuestoComponent,
    AddSolicitudRepuestoComponent,
    EditSolicitudRepuestoComponent
  ]
})
export class SolicitudRepuestoModule {
}
