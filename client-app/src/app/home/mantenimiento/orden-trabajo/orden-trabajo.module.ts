import {NgModule} from '@angular/core';
import {CommonModuleImportsModule} from '../../../shared/common-module-imports.module';
import {OrdenTrabajoComponent} from './orden-trabajo.component';
import {OrdenTrabajoService} from '../../../service/orden-trabajo.service';
import {AddOrdenTrabajoComponent} from './add-orden-trabajo/add-orden-trabajo.component';
import {ListaOrdenTrabajoComponent} from './lista-orden-trabajo/lista-orden-trabajo.component';
import {SharedModule} from '../../../shared/shared.module';
import {EditOrdenTrabajoComponent} from './edit-orden-trabajo/edit-orden-trabajo.component';
import {AtenderOrdenTrabajoComponent} from './atender-orden-trabajo/atender-orden-trabajo.component';
import {CalendarModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModuleImportsModule,
    CalendarModule,
    SharedModule
  ],
  exports: [
    OrdenTrabajoComponent,
    AddOrdenTrabajoComponent,
    ListaOrdenTrabajoComponent,
    EditOrdenTrabajoComponent,
    AtenderOrdenTrabajoComponent
  ],
  providers: [
    OrdenTrabajoService
  ],
  declarations: [
    OrdenTrabajoComponent,
    AddOrdenTrabajoComponent,
    ListaOrdenTrabajoComponent,
    EditOrdenTrabajoComponent,
    AtenderOrdenTrabajoComponent
  ]
})
export class OrdenTrabajoModule {
}
