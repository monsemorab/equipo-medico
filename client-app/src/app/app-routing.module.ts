import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {EquipoComponent} from './home/equipo/equipo.component';
import {ListaEquipoComponent} from './home/equipo/lista-equipo/lista-equipo.component';
import {AddEquipoComponent} from './home/equipo/add-equipo/add-equipo.component';
import {EditEquipoComponent} from './home/equipo/edit-equipo/edit-equipo.component';
import {ContratoComponent} from './home/contrato/contrato.component';
import {ListaContratoComponent} from './home/contrato/lista-contrato/lista-contrato.component';
import {AddContratoComponent} from './home/contrato/add-contrato/add-contrato.component';
import {EditContratoComponent} from './home/contrato/edit-contrato/edit-contrato.component';
import {MantenimientoComponent} from './home/mantenimiento/mantenimiento.component';
import {OrdenTrabajoComponent} from './home/mantenimiento/orden-trabajo/orden-trabajo.component';
import {AddOrdenTrabajoComponent} from './home/mantenimiento/orden-trabajo/add-orden-trabajo/add-orden-trabajo.component';
import {AtenderOrdenTrabajoComponent} from './home/mantenimiento/orden-trabajo/atender-orden-trabajo/atender-orden-trabajo.component';
import {EditOrdenTrabajoComponent} from './home/mantenimiento/orden-trabajo/edit-orden-trabajo/edit-orden-trabajo.component';
import {ListaOrdenTrabajoComponent} from './home/mantenimiento/orden-trabajo/lista-orden-trabajo/lista-orden-trabajo.component';
import {ListarSolicitudComponent} from './home/mantenimiento/solicitud-repuesto/listar-solicitud/listar-solicitud.component';
import {AddSolicitudComponent} from './home/mantenimiento/solicitud-repuesto/add-solicitud/add-solicitud.component';
import {EditSolicitudComponent} from './home/mantenimiento/solicitud-repuesto/edit-solicitud/edit-solicitud.component';
import {SolicitudRepuestoComponent} from './home/mantenimiento/solicitud-repuesto/solicitud-repuesto.component';
import {ListaOrdenTrabajoAtendidasComponent} from "./home/mantenimiento/orden-trabajo/lista-orden-trabajo-atendidas/lista-orden-trabajo-atendidas.component";
import {EditMantenimientoComponent} from "./home/mantenimiento/orden-trabajo/edit-mantenimiento/edit-mantenimiento.component";
import {InformesComponent} from "./home/informes/informes.component";
import {InformeEquiposComponent} from "./home/informes/informe-equipos/informe-equipos.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home/equipos', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'equipos', component: EquipoComponent,
        children: [
          {path: 'lista-equipo', component: ListaEquipoComponent},
          {path: 'crear-equipo', component: AddEquipoComponent},
          {path: 'editar-equipo/:id', component: EditEquipoComponent}
        ]
      },
      {
        path: 'contratos', component: ContratoComponent,
        children: [
          {path: 'lista-contrato', component: ListaContratoComponent},
          {path: 'crear-contrato', component: AddContratoComponent},
          {path: 'editar-contrato/:id', component: EditContratoComponent}
        ]
      },
      {
        path: 'mantenimiento', component: MantenimientoComponent,
        children: [
          {
            path: 'orden-trabajo', component: OrdenTrabajoComponent,
            children: [
              {path: 'lista-orden-trabajo', component: ListaOrdenTrabajoComponent},
              {path: 'crear-orden-trabajo', component: AddOrdenTrabajoComponent},
              {path: 'editar-orden-trabajo/:id', component: EditOrdenTrabajoComponent},
              {path: 'atender-orden-trabajo/:id', component: AtenderOrdenTrabajoComponent},
              {path: 'lista-orden-trabajo-finalizadas', component: ListaOrdenTrabajoAtendidasComponent},
              {path: 'editar-mantenimiento-realizado/:id', component: EditMantenimientoComponent}
            ]
          },
          {
            path: 'repuestos', component: SolicitudRepuestoComponent,
            children: [
              {path: 'lista-solicitud-repuesto', component: ListarSolicitudComponent},
              {path: 'crear-solicitud-repuesto', component: AddSolicitudComponent},
              {path: 'editar-solicitud-repuesto/:id', component: EditSolicitudComponent}
            ]
          },
        ]
      },
      {
        path: 'informes', component: InformesComponent,
        children: [
          {path: 'informe-equipo', component: InformeEquiposComponent},
        ]
      }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
