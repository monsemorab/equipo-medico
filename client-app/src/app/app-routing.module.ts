import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MantenimientosComponent} from "./mantenimientos/mantenimientos.component";
import {EquipoComponent} from "./mantenimientos/equipo/equipo.component";
import {AddEditEquipoComponent} from "./mantenimientos/equipo/add-edit-equipo/add-edit-equipo.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'mantenimientos/equipos', pathMatch: 'full'},
  {
    path: 'mantenimientos', component: MantenimientosComponent,
    children: [
      {path: 'equipos', component: EquipoComponent},
      {path: 'abmEquipo', component: AddEditEquipoComponent}
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
