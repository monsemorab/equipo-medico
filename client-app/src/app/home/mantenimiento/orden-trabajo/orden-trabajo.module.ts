import {NgModule} from '@angular/core';
import {CommonModuleImportsModule} from '../../../shared/common-module-imports.module';
import {OrdenTrabajoComponent} from './orden-trabajo.component';
import {OrdenTrabajoService} from '../../../service/orden-trabajo.service';
import {AddOrdenTrabajoComponent} from './add-orden-trabajo/add-orden-trabajo.component';
import {ListaOrdenTrabajoComponent} from './lista-orden-trabajo/lista-orden-trabajo.component';

@NgModule({
  imports: [
    CommonModuleImportsModule
  ],
  exports: [
    OrdenTrabajoComponent,
    AddOrdenTrabajoComponent,
    ListaOrdenTrabajoComponent
  ],
  providers: [
    OrdenTrabajoService
  ],
  declarations: [
    OrdenTrabajoComponent,
    AddOrdenTrabajoComponent,
    ListaOrdenTrabajoComponent
  ]
})
export class OrdenTrabajoModule {
}
