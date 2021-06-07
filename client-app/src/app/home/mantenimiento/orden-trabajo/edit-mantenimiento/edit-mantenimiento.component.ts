import { Component, OnInit } from '@angular/core';
import {EstadoOrdenTrabajoLista, OrdenTrabajo} from "../../../../domain/orden-trabajo";
import {Equipo} from "../../../../domain/equipo";
import {SolicitudRepuesto} from "../../../../domain/solicitud-repuesto";
import {Mantenimiento} from "../../../../domain/mantenimiento";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrdenTrabajoService} from "../../../../service/orden-trabajo.service";
import {switchMap} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {ManteniminetoService} from "../../../../service/mantenimineto.service";
import {SolicitudRepuestoDetalle} from "../../../../domain/solicitud-repuesto-detalle";
import {EquipoService} from "../../../../service/equipo.service";
import {EstadoOrdenTrabajo} from "../../../../utils/estado-orden";
import {EstadoSolicitudRepuesto} from "../../../../utils/estado-solicitud-repuesto";
import {EstadoEquipo} from "../../../../utils/estado-equipo";
import {SolicitudRepuestoService} from "../../../../service/solicitud-repuesto.service";

@Component({
  selector: 'app-edit-mantenimiento',
  templateUrl: './edit-mantenimiento.component.html',
  styleUrls: ['./edit-mantenimiento.component.css']
})
export class EditMantenimientoComponent implements OnInit {

  // orden trabajo
  ordenTrabajo: OrdenTrabajo;
  id: number;
  estadoOT: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fechaRealizacion: any;
  equipo: Equipo;
  solicitudRepuesto: SolicitudRepuesto;
  estados: EstadoOrdenTrabajoLista[];

  // mantenimiento
  mantenimientoId: number;
  tareaRealizada: string;
  informeNro: number;
  nombreTecnico: string;
  fechaMantenimiento: any;
  servicioRealizado: Mantenimiento;
  readOnlyField: boolean;

  // modal para agregar/editar detalle de repuesto a la solicitud
  modalAddEditDetalleOpen = false;
  detalleSeleccionado: SolicitudRepuestoDetalle;
  solicitudRepuestoDetalles = new Array<SolicitudRepuestoDetalle>();

  // Errors
  error: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private equipoService: EquipoService,
              private ordenTrabajoService: OrdenTrabajoService,
              private manteniminetoService: ManteniminetoService,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.fechaMantenimiento = new Date();
    this.getEstadosOrdenTrabajo();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.ordenTrabajoService.getOrdenTrabajoById(+params.get('id')))
      ).subscribe(orden => {
        this.ordenTrabajo = new OrdenTrabajo(orden.id, orden.estado, orden.tipoServicio, orden.diagnostico,
          orden.responsable, orden.equipo, orden.solicitudRepuesto, orden.mantenimiento, orden.fechaSolicitud);
        this.camposAEditar(this.ordenTrabajo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.error = true;
      });
  }

  /**
   * Se obtiene la lista de los estados para editar una solicitud.
   */
  getEstadosOrdenTrabajo(): void {
    this.ordenTrabajoService.getEstadosOrdenAtendida().subscribe(
      estados => {
        this.estados = estados;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.estados = [];
      }
    );
  }

  /**
   * Se selecciona un estado para la orden de trabajo.
   * @param {string} value
   */
  onSelectedEstado(value: string): void {
    this.estadoOT = value;
  }

  /**
   * Se establecen los campos a ser editados.
   * @param orden
   */
  camposAEditar(orden: OrdenTrabajo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = orden.id;
    this.estadoOT = orden.estado;
    this.tipoServicio = orden.tipoServicio;
    this.diagnostico = orden.diagnostico;
    this.responsable = orden.responsable;
    if(orden.fechaSolicitud != null) {
      this.fechaRealizacion = datepipe.transform(orden.fechaSolicitud, 'dd-MM-yyyy').toString();
    }
    this.equipo = orden.equipo;
    this.solicitudRepuesto = orden.solicitudRepuesto;
    if (this.solicitudRepuesto != null) {
      this.solicitudRepuestoDetalles = this.solicitudRepuesto.solicitudRepuestoDetalles;
    }
    this.servicioRealizado = orden.mantenimiento;
    this.mantenimientoId = this.servicioRealizado.id;
    this.tareaRealizada = this.servicioRealizado.tareaRealizada;
    this.informeNro = this.servicioRealizado.informeNumero;
    this.nombreTecnico = this.servicioRealizado.nombreTecnico;

    if(this.estadoOT === EstadoOrdenTrabajo.FINALIZADO) {
      this.readOnlyField = true;
    }
  }

  /**
   * Cuando se selecciona un detalle repuesto para editar sus datos.
   */
  editarRepuesto(repuesto: SolicitudRepuestoDetalle): void {
    this.detalleSeleccionado = repuesto;
    this.eliminarDetalleRepuesto(this.detalleSeleccionado);
    this.modalAddEditDetalleOpen = true;
  }

  /**
   * Se quita de la lista de detalles el repuesto que se quiere  editar.
   */
  eliminarDetalleRepuesto(repuestoSeleccionado: SolicitudRepuestoDetalle): void {
    for (let i = 0; i < this.solicitudRepuestoDetalles.length; i++) {
      if (repuestoSeleccionado.id === this.solicitudRepuestoDetalles[i].id) {
        this.solicitudRepuestoDetalles.splice(i, 1);
        break;
      }
    }
  }

  /**
   * El repuesto creado o editado es agregado a la lista de detalles de la solicitud de repuestos.
   * @param value
   */
  addEditRepuesto(value: SolicitudRepuestoDetalle) {
    this.solicitudRepuestoDetalles.push(value);
    this.detalleSeleccionado = null;
    this.modalAddEditDetalleOpen = false;
    this.verificarSolicitudRepuesto();
  }

  /**
   * Cuando se cancela la edición de un repuesto, el repuesto seleccionado se agrega de nuevo a la lista de
   * detalles de la solicitud repuestos.
   * @param value
   */
  onCancelAddEditRepuesto(value: SolicitudRepuestoDetalle) {
    if (value != null) {
      this.solicitudRepuestoDetalles.push(value);
    }
    this.detalleSeleccionado = null;
    this.modalAddEditDetalleOpen = false;
  }

  /**
   * Se verifica que todos los repuestos dentro de la solicitud de repuestos se hayan completado la cantidad adquirida
   * y la cantidad usada en la orden de trabajo.
   * Si estos campos estan vacios o son cero, se toma como que el repuesto no ha sido adquirido.
   */
  verificarSolicitudRepuesto() {
    let repuestoAdquirido = 0;
    for (let i = 0; i < this.solicitudRepuestoDetalles.length; i++) {
      if ((this.solicitudRepuestoDetalles[i].cantidadUsada !== null && this.solicitudRepuestoDetalles[i].cantidadUsada > 0) &&
        (this.solicitudRepuestoDetalles[i].repuesto.cantidadAdquirida !== undefined &&
          this.solicitudRepuestoDetalles[i].repuesto.cantidadAdquirida > 0)) {
        repuestoAdquirido++;
      }
    }

    /**
     * toda la lista de repuesto deben tener los campos cantidadUsada y cantidadAdquirida completados con valores mayores
     * a cero para que el estado de la solicitud sea Finalizado. */
    if(repuestoAdquirido === this.solicitudRepuestoDetalles.length) {
      this.solicitudRepuesto.estado = EstadoSolicitudRepuesto.FINALIZADO;
    } else {
      this.solicitudRepuesto.estado = EstadoSolicitudRepuesto.PENDIENTE_EN_ORDEN_TRABAJO ;
    }

    this.uodateSolicitudRepuesto(this.solicitudRepuesto);
  }

  /**
   * Se editan los datos de la solicitud de repuestos seleccionada.
   * @param solicitud
   */
  uodateSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.solicitudRepuestoService.editarSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.error = true;
      }
    );
  }

  /**
   * Cuando se guarda la información introducida.
   */
  onSaveMantenimiento() {
    if(this.estadoOT === EstadoOrdenTrabajo.FINALIZADO) {
      this.ordenTrabajo.estado = this.estadoOT;
      if(this.solicitudRepuesto.estado !== EstadoSolicitudRepuesto.FINALIZADO) {
        this.errorMessage = "La Orden de Trabajo no puede ser Finalizada. La Solicitud de Repuesto aún no fue finalizada.";
        this.error = true;
      } else {
        let cantUsadaNoActualizada = false;
        for (let i = 0; i < this.solicitudRepuestoDetalles.length; i++) {
          if (this.solicitudRepuestoDetalles[i].cantidadUsada === null ||
            this.solicitudRepuestoDetalles[i].cantidadUsada === undefined) {
            cantUsadaNoActualizada = true;
            break;
          }
        }
        if(cantUsadaNoActualizada) {
          this.errorMessage = "La Orden de Trabajo no puede ser Finalizada. El campo Cant. Usada del repuesto no ha sido actualziada.";
          this.error = true;
        }
      }
    }
    if(!this.error) {
      if (this.fechaRealizacion != null && (typeof this.fechaRealizacion === 'string' || this.fechaRealizacion instanceof String)) {
        let parts = this.fechaRealizacion.split('/');
        this.fechaRealizacion = new Date(+parts[2], +parts[0] - 1, +parts[1]);
      }
      this.servicioRealizado = new Mantenimiento(this.mantenimientoId, this.tareaRealizada, this.informeNro,
        this.nombreTecnico, this.servicioRealizado.tipoServicio, this.servicioRealizado.estadoEquipo, this.fechaMantenimiento);
      if (this.tareaRealizada != '' && this.nombreTecnico != '') {
        this.updateMantenimiento(this.servicioRealizado);
      }
      this.goBack();
    }
  }

  /**
   * Se guardan los datos modificados del servicio realizado a la orden de trabajo.
   * @param servicioRealizado
   */
  updateMantenimiento(servicioRealizado: Mantenimiento) {
    this.manteniminetoService.editarMantenimineto(servicioRealizado).subscribe(
      mantenimineto => {
        this.servicioRealizado = mantenimineto;
        if(this.ordenTrabajo.estado === EstadoOrdenTrabajo.FINALIZADO) {
          this.updateOrdenTrabajo(this.servicioRealizado);
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.ordenTrabajo = null;
      }
    );
  }

  updateOrdenTrabajo(servcioRealizado: Mantenimiento) {
    this.ordenTrabajo.mantenimiento = servcioRealizado;
    this.ordenTrabajoService.editarOrdenTrabajo(this.ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        this.ordenTrabajo.equipo.estado = EstadoEquipo.OPERATIVO;
        this.updateEquipo(this.ordenTrabajo.equipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.error = true;
      }
    );
  }

  updateEquipo(equipo: Equipo): void {
    this.equipoService.editarEquipo(equipo).subscribe(
      respuesta => {
        console.log(respuesta);
        this.cambioEstadoEquipo(respuesta);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.error = true;
      }
    );
  }

  cambioEstadoEquipo(equipo: Equipo): void {
    this.equipoService.cambioEstadoEquipo(equipo).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      respuesta => {
        console.log(respuesta);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo-finalizadas']);
  }
}
