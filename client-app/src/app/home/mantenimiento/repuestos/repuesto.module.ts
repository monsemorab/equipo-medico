import { NgModule } from '@angular/core';
import {CommonModuleImportsModule} from "../../../shared/common-module-imports.module";
import {SharedModule} from "../../../shared/shared.module";
import {SolicitudRepuestoService} from "../../../service/solicitud-repuesto.service";
import {RepuestosComponent} from "./repuestos.component";
import {ListaRepuestosComponent} from "./lista-repuestos/lista-repuestos.component";
import {AddRepuestoComponent} from "./add-repuesto/add-repuesto.component";
import {EditRepuestoComponent} from "./edit-repuesto/edit-repuesto.component";
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModuleImportsModule,
        SharedModule,
        TableModule
    ],
  declarations: [
    RepuestosComponent,
    ListaRepuestosComponent,
    AddRepuestoComponent,
    EditRepuestoComponent
  ],
  exports: [
    RepuestosComponent,
    ListaRepuestosComponent,
    AddRepuestoComponent,
    EditRepuestoComponent
  ],
  providers: [
    SolicitudRepuestoService
  ],
})
export class RepuestoModule { }
