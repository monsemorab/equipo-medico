import {NgModule} from '@angular/core';
import {CommonModuleImportsModule} from "../common-module-imports.module";
import {OrdenTrabajoComponent} from "./orden-trabajo.component";
import {OrdenTrabajoService} from "../../service/orden-trabajo.service";
import {AddOrdenTrabajoComponent} from './add-orden-trabajo/add-orden-trabajo.component';

@NgModule({
  imports: [
    CommonModuleImportsModule
  ],
  exports: [OrdenTrabajoComponent, AddOrdenTrabajoComponent],
  providers: [
    OrdenTrabajoService
  ],
  declarations: [
    OrdenTrabajoComponent,
    AddOrdenTrabajoComponent
  ]
})
export class OrdenTrabajoModule {
}
