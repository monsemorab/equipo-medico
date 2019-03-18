import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {EquipoComponent} from "./home/equipo/equipo.component";
import {ContratoComponent} from "./home/contrato/contrato.component";
import {MantenimientoComponent} from "./home/mantenimiento/mantenimiento.component";
import {SolicitudComponent} from "./home/mantenimiento/solicitud/solicitud.component";
import {AddContratoComponent} from "./home/contrato/add-contrato/add-contrato.component";
import {ListaContratoComponent} from "./home/contrato/lista-contrato/lista-contrato.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home/equipos', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'equipos', component: EquipoComponent},
      {
        path: 'contratos', component: ContratoComponent,
        children: [
          {path: 'lista-contrato', component: ListaContratoComponent},
          {path: 'crear-contrato', component: AddContratoComponent}
        ]
      },
      {
        path: 'mantenimiento', component: MantenimientoComponent,
        children: [
          {path: 'solicitud', component: SolicitudComponent}
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
