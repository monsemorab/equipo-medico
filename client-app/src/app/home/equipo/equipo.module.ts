import {NgModule} from '@angular/core';
import {EquipoComponent} from './equipo.component';
import {EquipoService} from '../../service/equipo.service';
import {CommonModuleImportsModule} from '../../shared/common-module-imports.module';
import {CalendarModule, DropdownModule} from 'primeng/primeng';
import {ListaEquipoComponent} from './lista-equipo/lista-equipo.component';
import {AddEquipoComponent} from './add-equipo/add-equipo.component';
import {EditEquipoComponent} from './edit-equipo/edit-equipo.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModuleImportsModule,
    DropdownModule,
    CalendarModule,
    SharedModule
  ],
  exports: [EquipoComponent],
  providers: [EquipoService],
  declarations: [
    EquipoComponent,
    ListaEquipoComponent,
    AddEquipoComponent,
    EditEquipoComponent]
})
export class EquipoModule {
}
