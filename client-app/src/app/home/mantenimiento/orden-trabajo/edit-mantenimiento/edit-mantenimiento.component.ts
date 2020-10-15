import { Component, OnInit } from '@angular/core';
import {OrdenTrabajo} from "../../../../domain/orden-trabajo";
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

@Component({
  selector: 'app-edit-mantenimiento',
  templateUrl: './edit-mantenimiento.component.html',
  styleUrls: ['./edit-mantenimiento.component.css']
})
export class EditMantenimientoComponent implements OnInit {

  // orden trabajo
  ordenTrabajo: OrdenTrabajo;
  id: number;
  estado: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fechaRealizacion: any;
  equipo: Equipo;
  solicitudRepuesto: SolicitudRepuesto;

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
              private manteniminetoService: ManteniminetoService) {
  }

  ngOnInit() {
    this.fechaMantenimiento = new Date();
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
        console.log(this.errorMessage)
        this.error = true;
      });
  }

  /**
   * Se establecen los campos a ser editados.
   * @param orden
   */
  camposAEditar(orden: OrdenTrabajo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = orden.id;
    this.estado = orden.estado;
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
   * Cuando se guarda la información introducida.
   */
  onSaveMantenimiento() {
    if (this.fechaRealizacion != null && (typeof this.fechaRealizacion === 'string' || this.fechaRealizacion instanceof String)) {
      let parts = this.fechaRealizacion.split('/');
      this.fechaRealizacion = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.servicioRealizado = new Mantenimiento(this.mantenimientoId, this.tareaRealizada, this.informeNro,
      this.nombreTecnico, this.fechaMantenimiento);
    if(this.tareaRealizada != '' && this.nombreTecnico != '') {
      this.updateMantenimiento(this.servicioRealizado);
    } else {
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
        this.updateOrdenTrabajo(this.servicioRealizado);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajo = null;
      }
    );
  }

  updateOrdenTrabajo(servcioRealizado: Mantenimiento) {
    this.ordenTrabajo.estado = "Finalizada";
    this.ordenTrabajo.mantenimiento = servcioRealizado;
    this.ordenTrabajoService.editarOrdenTrabajo(this.ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        this.ordenTrabajo.equipo.estado = 'Operativo';
        this.updateEquipo(this.ordenTrabajo.equipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  updateEquipo(equipo: Equipo): void {
    this.equipoService.editarEquipo(equipo).subscribe(
      respuesta => {
        console.log(respuesta)
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
