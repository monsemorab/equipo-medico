import { Component, OnInit } from '@angular/core';
import {OrdenTrabajo, TipoServicio} from "../../../../domain/orden-trabajo";
import {Router} from "@angular/router";
import {OrdenTrabajoService} from "../../../../service/orden-trabajo.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lista-orden-trabajo-atendidas',
  templateUrl: './lista-orden-trabajo-atendidas.component.html',
  styleUrls: ['./lista-orden-trabajo-atendidas.component.css']
})
export class ListaOrdenTrabajoAtendidasComponent implements OnInit {


  // orden trabajo
  selectedOrdenTrabajo: OrdenTrabajo;
  // Tipo de Servicios
  tipoServicios: TipoServicio[];
  tipoSeleccionado: string;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  ordenTrabajoList: OrdenTrabajo[];

  constructor(private router: Router,
              private ordenTrabajoService: OrdenTrabajoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedOrdenTrabajo = null;
    this.tipoSeleccionado = 'Seleccione una opción';
    this.getTipoServicios();
    this.getAllOrdenTrabajo();
  }

  /**
   * Se obtiene la lista de los tipos de servicios para un mantenimiento.
   */
  getTipoServicios(): void {
    this.ordenTrabajoService.getTipoServicios().subscribe(
      servicios => {
        this.tipoServicios = servicios;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.tipoServicios = [];
      }
    );
  }


  /**
   * Se obtiene la lista de todas las ordenes de trabajo pendientes.
   */
  getAllOrdenTrabajo(): void {
    this.ordenTrabajoService.getAllByEstado("Pendiente").subscribe(
      list => {
        this.ordenTrabajoList = list;
        this.formateoFechas();
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajoList = [];
        this.loading = false;
      }
    );
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for (let i = 0; i < this.ordenTrabajoList.length; i++) {
      if (this.ordenTrabajoList[i].fechaRealizacion != null) {
        this.ordenTrabajoList[i].fechaRealizacion = datepipe.transform(this.ordenTrabajoList[i].fechaRealizacion, 'dd-MM-yyyy');
      }
    }
    this.loading = false;
  }

  /**
   * Cuando se selecciona el filtro por tipo de mantenimineto
   */
  onSelectedTipoMantinieminto(): void {
    this.info = false;
    this.error = false;
    if (this.tipoSeleccionado == 'Seleccione una opción') {
      this.getAllOrdenTrabajo();
    } else {
      this.getAllOrdenTrabajoByTipoMantenimiento(this.tipoSeleccionado);
    }
  }

  /**
   * Se obtiene la lista filtrada por tipo de servicio
   * @param tipoSeleccionado
   */
  getAllOrdenTrabajoByTipoMantenimiento(tipoSeleccionado: string): void {
    this.ordenTrabajoService.getAllByTipoMantenimiento(tipoSeleccionado).subscribe(
      list => {
        this.ordenTrabajoList = list;
        this.formateoFechas();
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajoList = [];
        this.loading = false;
      }
    );
  }

  /**
   * Editar un mantenimineto realizado.
   */
  editarMantenimineto(ordenTrabajoId: number): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/editar-mantenimiento-realizado/' + ordenTrabajoId]);
  }

}
