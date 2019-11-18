import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {EquipoComponent} from "./home/equipo/equipo.component";
import {ListaEquipoComponent} from "./home/equipo/lista-equipo/lista-equipo.component";
import {AddEquipoComponent} from "./home/equipo/add-equipo/add-equipo.component";
import {EditEquipoComponent} from "./home/equipo/edit-equipo/edit-equipo.component";
import {ContratoComponent} from "./home/contrato/contrato.component";
import {ListaContratoComponent} from "./home/contrato/lista-contrato/lista-contrato.component";
import {AddContratoComponent} from "./home/contrato/add-contrato/add-contrato.component";
import {EditContratoComponent} from "./home/contrato/edit-contrato/edit-contrato.component";
import {MantenimientoComponent} from "./home/mantenimiento/mantenimiento.component";
import {SolicitudComponent} from "./home/mantenimiento/solicitud/solicitud.component";
import {ListaSolicitudServicioComponent} from "./home/mantenimiento/solicitud/lista-solicitud-servicio/lista-solicitud-servicio.component";
import {AddSolicitudServicioComponent} from "./home/mantenimiento/solicitud/add-solicitud-servicio/add-solicitud-servicio.component";
import {EditSolicitudServicioComponent} from "./home/mantenimiento/solicitud/edit-solicitud-servicio/edit-solicitud-servicio.component";
import {OrdenTrabajoComponent} from "./shared/orden-trabajo/orden-trabajo.component";
import {AddOrdenTrabajoComponent} from "./shared/orden-trabajo/add-orden-trabajo/add-orden-trabajo.component";
import {ListaSolicitudRepuestoComponent} from "./home/mantenimiento/solicitud-repuesto/lista-solicitud-repuesto/lista-solicitud-repuesto.component";
import {AddSolicitudRepuestoComponent} from "./home/mantenimiento/solicitud-repuesto/add-solicitud-repuesto/add-solicitud-repuesto.component";
import {EditSolicitudRepuestoComponent} from "./home/mantenimiento/solicitud-repuesto/edit-solicitud-repuesto/edit-solicitud-repuesto.component";


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
            path: 'solicitud', component: SolicitudComponent,
            children: [
              {path: 'lista-solicitud-servicio', component: ListaSolicitudServicioComponent},
              {path: 'crear-solicitud-servicio', component: AddSolicitudServicioComponent},
              {path: 'editar-solicitud-servicio/:id', component: EditSolicitudServicioComponent}
            ]
          },
          {
            path: 'orden-trabajo', component: OrdenTrabajoComponent,
            children: [
              {path: 'crear-orden-trabajo', component: AddOrdenTrabajoComponent}
            ]
          },
          {
            path: 'repuestos', component: SolicitudComponent,
            children: [
              {path: 'lista-solicitud-repuesto', component: ListaSolicitudRepuestoComponent},
              {path: 'crear-solicitud-repuesto', component: AddSolicitudRepuestoComponent},
              {path: 'editar-solicitud-repuesto/:id', component: EditSolicitudRepuestoComponent}
            ]
          },
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
