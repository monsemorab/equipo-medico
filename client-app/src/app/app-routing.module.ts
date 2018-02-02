import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {EquipoComponent} from "./home/equipo/equipo.component";
import {ContratoComponent} from "./home/contrato/contrato.component";
import {MantenimientoComponent} from "./home/mantenimiento/mantenimiento.component";
import {SolicitudComponent} from "./home/mantenimiento/solicitud/solicitud.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home/equipos', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'equipos', component: EquipoComponent},
      {path: 'contratos', component: ContratoComponent},
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
  declarations: []
})
export class AppRoutingModule {
}
