import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {EquipoComponent} from "./home/equipo/equipo.component";
import {AddEditEquipoComponent} from "./home/equipo/add-edit-equipo/add-edit-equipo.component";
import {ContratoComponent} from "./home/contrato/contrato.component";
import {AddEditContratoComponent} from "./home/contrato/add-edit-contrato/add-edit-contrato.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home/equipos', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'equipos', component: EquipoComponent},
      {path: 'abmEquipo', component: AddEditEquipoComponent},
      {path: 'contratos', component: ContratoComponent},
      {path: 'abmContrato', component: AddEditContratoComponent}
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
