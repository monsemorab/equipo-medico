import {Component, OnInit} from '@angular/core';
import {EstadoOrdenTrabajoLista, OrdenTrabajo} from '../../../../domain/orden-trabajo';
import {Equipo} from '../../../../domain/equipo';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';
import {switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";
import {Mantenimiento} from "../../../../domain/mantenimiento";
import {ManteniminetoService} from "../../../../service/mantenimineto.service";
import {EquipoService} from "../../../../service/equipo.service";
import {SolicitudRepuestoDetalle} from "../../../../domain/solicitud-repuesto-detalle";
import {EstadoOrdenTrabajo} from "../../../../utils/estado-orden";
import {EstadoEquipo} from "../../../../utils/estado-equipo";
import {EstadoSolicitudRepuesto} from "../../../../utils/estado-solicitud-repuesto";
import {SolicitudRepuestoService} from "../../../../service/solicitud-repuesto.service";

@Component({
  selector: 'app-atender-orden-trabajo',
  templateUrl: './atender-orden-trabajo.component.html',
  styleUrls: ['./atender-orden-trabajo.component.css']
})
export class AtenderOrdenTrabajoComponent implements OnInit {

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

  // modal para agregar/editar detalle de repuesto a la solicitud
  modalAddEditDetalleOpen = false;
  detalleSeleccionado: SolicitudRepuestoDetalle;
  solicitudRepuestoDetalles = new Array<SolicitudRepuestoDetalle>();

  // mantenimiento
  tareaRealizada: string;
  informeNro: number;
  numeroOrdenServicio:number;
  nombreTecnico: string;
  estadoEquipo:string;
  fechaMantenimiento: any;
  servicioRealizado: Mantenimiento;
  servicioRealizadoList = new Array<Mantenimiento>();

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
          orden.responsable, orden.equipo, orden.solicitudRepuesto, orden.mantenimientos, orden.fechaSolicitud);
        this.camposAEditar(this.ordenTrabajo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
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
        console.log(estados)
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
    if(orden.estado == 'Pendiente') {
      this.estadoOT = EstadoOrdenTrabajo.EN_PROCESO;
    } else {
      this.estadoOT = orden.estado;
    }
    this.tipoServicio = orden.tipoServicio;
    this.diagnostico = orden.diagnostico;
    this.responsable = orden.responsable;
    if (orden.fechaSolicitud != null) {
      this.fechaRealizacion = datepipe.transform(orden.fechaSolicitud, 'MM/dd/yyyy');
    }
    this.equipo = orden.equipo;
    this.equipo.fechaVenGarantia = datepipe.transform(this.equipo.fechaVenGarantia, 'dd-MM-yyyy');
    this.solicitudRepuesto = orden.solicitudRepuesto;
    if (this.solicitudRepuesto != null) {
      this.solicitudRepuestoDetalles = this.solicitudRepuesto.solicitudRepuestoDetalles;
      console.log(this.solicitudRepuestoDetalles);
      console.log(this.solicitudRepuestoDetalles[0].repuesto);
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
    if (this.estadoOT === EstadoOrdenTrabajo.FINALIZADO && this.solicitudRepuesto.estado !== EstadoSolicitudRepuesto.FINALIZADO) {
      this.errorMessage = "La Orden de Trabajo no puede ser Finalizada. La Solicitud de Repuesto aún no fue finalizada.";
      this.error = true;
    }

    if(!this.error) {
      if (this.informeNro!= undefined && this.tareaRealizada != '' && this.nombreTecnico != '') {
        this.servicioRealizado = new Mantenimiento(null, this.numeroOrdenServicio, this.tareaRealizada, this.informeNro, this.nombreTecnico,
          this.ordenTrabajo.tipoServicio, this.equipo.estado, this.ordenTrabajo, this.fechaMantenimiento);
        this.saveMantenimiento(this.servicioRealizado);
      }else {
        this.goBack();
      }
    }

  }

  /**
   * Se guardan los datos del servicio realizado a la orden de trabajo.
   * @param servicioRealizado
   */
  saveMantenimiento(servicioRealizado: Mantenimiento) {
    this.manteniminetoService.crearMantenimineto(servicioRealizado).subscribe(
      mantenimineto => {
        this.servicioRealizado = mantenimineto;
        this.servicioRealizadoList.push(this.servicioRealizado);
        this.manteniminetoService.emitExisteOrdenTrabajoAtendida(true);
        this.updateOrdenTrabajo(this.servicioRealizadoList);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.ordenTrabajo = null;
      }
    );
  }

  updateOrdenTrabajo(servcioRealizado: Mantenimiento[]) {
    this.ordenTrabajo.mantenimientos = servcioRealizado;
    this.ordenTrabajo.estado = this.estadoOT;
    this.ordenTrabajoService.editarOrdenTrabajo(this.ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        if(this.ordenTrabajo.estado === EstadoOrdenTrabajo.FINALIZADO) {
          this.ordenTrabajo.equipo.estado = EstadoEquipo.OPERATIVO;
          this.updateEquipo(this.ordenTrabajo.equipo);
        } else {
          this.manteniminetoService.emitExisteOrdenTrabajoAtendida(true);
          this.goListaDeTrabajosFinalizados();
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.error = true;
      }
    );
  }

  updateEquipo(equipo: Equipo): void {
    this.equipoService.editarEquipo(equipo).subscribe(
      respuesta => {
        console.log(respuesta)
        this.cambioEstadoEquipo(respuesta);
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.error = true;
      }
    );
  }

  cambioEstadoEquipo(equipo: Equipo): void {
    this.equipoService.cambioEstadoEquipo(equipo).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      respuesta => {
        console.log(respuesta)
        this.manteniminetoService.emitExisteOrdenTrabajoAtendida(true);
        this.goListaDeTrabajosFinalizados();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado de orden de trabajos pendientes.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
  }

  goListaDeTrabajosFinalizados(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo-finalizadas']);
  }
}

