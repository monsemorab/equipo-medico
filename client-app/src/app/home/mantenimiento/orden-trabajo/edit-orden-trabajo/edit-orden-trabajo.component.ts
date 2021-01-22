import {Component, OnInit} from '@angular/core';
import {OrdenTrabajo, TipoServicio} from '../../../../domain/orden-trabajo';
import {Equipo} from '../../../../domain/equipo';
import {ParamsBusquedaEquipo} from '../../../../domain/ParamsBusquedaEquipo';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EquipoService} from '../../../../service/equipo.service';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";
import {SolicitudRepuestoDetalle} from "../../../../domain/solicitud-repuesto-detalle";
import {EstadoSolicitudRepuesto} from "../../../../utils/estado-solicitud-repuesto";
import {EstadoEquipo} from "../../../../utils/estado-equipo";

@Component({
  selector: 'app-edit-orden-trabajo',
  templateUrl: './edit-orden-trabajo.component.html',
  styleUrls: ['./edit-orden-trabajo.component.css']
})
export class EditOrdenTrabajoComponent implements OnInit {

// orden trabajo
  ordenTrabajo: OrdenTrabajo;
  id: number;
  estado: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fechaRealizacion: any;

  // Tipo de Servicios
  servicioSeleccionado: TipoServicio;
  tipoServicios: TipoServicio[];

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;
  selectedEquipo: boolean;

  // solicitud repuesto
  solicitudRepId: any;
  solicitudRepuesto: SolicitudRepuesto;
  solicitudRepuestoPendientes: SolicitudRepuesto[];
  esNuevaSolicitudRepuesto: boolean;
  fueActualizada: boolean;

  // modal para agregar/editar detalle de repuesto a la solicitud
  modalAddEditDetalleOpen = false;
  detalleSeleccionado: SolicitudRepuestoDetalle;
  isEditDetalle: boolean;
  solicitudRepuestoDetalles = new Array<SolicitudRepuestoDetalle>();


  // Errors
  error: boolean;
  errorMessage: string;
  equipoWarningMessage: string;
  equipoWarning: boolean;
  equipoSuccess: boolean;
  repErrorMessage: string;
  repError: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private equipoService: EquipoService,
              private ordenTrabajoService: OrdenTrabajoService,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.limpiarCampos();
    this.esNuevaSolicitudRepuesto = false;
    this.fueActualizada = false;
    this.equipoSuccess = false;
    this.getTipoServicios();
    this.getAllSolicitudRepuestosPendientes();

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
        console.log(error.error + error.message);
        this.error = true;
      });
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
        console.log(error.error + error.message);
        this.tipoServicios = [];
      }
    );
  }

  /**
   * Se obtienen todas las solicitudes de repuestos con estado pendiente
   */
  getAllSolicitudRepuestosPendientes(): void {
    this.solicitudRepuestoService.getAllSolicitudRepuestosPendientes().subscribe(
      solicitudesPendientes => {
        this.solicitudRepuestoPendientes = solicitudesPendientes;
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.tipoServicios = [];
      }
    );
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
    if (orden.solicitudRepuesto != null) {
      this.fechaRealizacion = datepipe.transform(orden.fechaSolicitud, 'MM/dd/yyyy');
    }
    this.equipoSeleccionado = orden.equipo;
    this.numeroPatrimonial = this.equipoSeleccionado.numeroPatrimonial;
    this.numeroSerie = this.equipoSeleccionado.numeroPatrimonial;
    this.selectedEquipo = true;
    this.solicitudRepuesto = orden.solicitudRepuesto;
    if (this.solicitudRepuesto != null) {
      this.solicitudRepId = this.solicitudRepuesto.id.toString();
      this.solicitudRepuestoDetalles = this.solicitudRepuesto.solicitudRepuestoDetalles;
    }
  }

  /**
   * Se selecciona un tipo de servicio de mantenimiento.
   * @param value
   */
  onSelectedTipoMantinieminto(value: string): void {
    this.tipoServicio = value;
  }


  /**
   * Al presionar la tecla enter, se realiza la busqueda del equipo por el campo Nro. de serie.
   * @param value
   */
  onEnterNroSerie(value: string) {
    if (value !== '' && value != null) {
      this.numeroSerie = value;
      this.buscarEquipo(this.numeroSerie, this.numeroPatrimonial);
    }
  }

  /**
   * Se obtiene el valor introducido en el campo nro. serie.
   * @param value
   */
  onKeyNroSerie(value: string) {
    this.numeroSerie = value;
  }

  /**
   * Al presionar la tecla enter, se realiza la busqueda del equipo por el campo Nro. patrimonial.
   * @param value
   */
  onEnterNroPatrimonial(value: string) {
    if (value !== '' && value != null) {
      this.numeroPatrimonial = value;
      this.buscarEquipo(this.numeroSerie, this.numeroPatrimonial);
    }
  }

  /**
   * Se obtiene el valor introducido en el campo nro. patrimonial.
   * @param value
   */
  onKeyNroPatrimonial(value: string) {
    this.numeroPatrimonial = value;
  }

  /**
   * Se realiza la busqueda del equipo, segun los campos nro. serie y/o nro. patrimonial.
   * Si existe un equipo que coincidan sus datos con los datos introducidos,
   * se muestra el equipo encontrado, si no, se muestra un mensaje al usuario.
   *
   * @param nroSerie
   * @param nroPatrimonial
   */
  buscarEquipo(nroSerie: string, nroPatrimonial: string): void {
    this.requestEquipo = new ParamsBusquedaEquipo(nroSerie, nroPatrimonial);
    this.equipoService.getEquipoByParams(this.requestEquipo).subscribe(
      equipo => {
        this.equipoSeleccionado = equipo;
        this.numeroPatrimonial = equipo.numeroPatrimonial;
        this.numeroSerie = equipo.numeroSerie;
        this.selectedEquipo = this.equipoSeleccionado != null;
        this.equipoWarning = false;
        this.equipoSuccess = true;
      },
      error => {
        this.equipoWarningMessage = "No se encontraron registros para esta busqueda.";
        console.log(this.equipoWarningMessage);
        this.equipoWarning = true;
        this.equipoSuccess = false;
      }
    );
  }

  deleteEquipo() {
    this.equipoSeleccionado.estado = EstadoEquipo.OPERATIVO;
    this.updateEquipo(this.equipoSeleccionado, true);
  }

  /**
   * Se limpian los campos del equipo buscado.
   */
  clearDatosEquipos() {
    this.equipoSeleccionado = null;
    this.onKeyNroSerie('');
    this.onKeyNroPatrimonial('');
    this.selectedEquipo = false;
  }

  /**
   * Se selecciona una solicitud de respuestos para la orden de trabajo.
   * Automaticamente se realiza la busqueda de esa solicitud de repuestos para obtner la información relacionada a la misma.
   */
  onSelectedSolicitudRepuesto(): void {
    if (this.solicitudRepId != "Seleccionar Solicitud") {
      this.buscarSolicitudRepuestoById(+this.solicitudRepId);
      this.fueActualizada = true;
    } else {

      if (this.solicitudRepuesto != null) {
        this.solicitudRepuesto.estado = EstadoSolicitudRepuesto.PENDIENTE_EN_ORDEN_TRABAJO;
        this.updateSolicitudRepuesto(this.solicitudRepuesto, false, false);
        this.solicitudRepuesto = null;
      }

    }
  }

  /**
   *Se busca la solicitud de repuestos que coincida con el id introducido,
   * si la solicitud existe, se muestra la lista de repuestos agregados,
   * si no existe se muestra un mensaje al usuario.
   */
  buscarSolicitudRepuestoById(solicitudRepId: number) {
    this.solicitudRepuestoService.getSolicitudRepuestoById(solicitudRepId).subscribe(
      solicitudRep => {
        this.solicitudRepuesto = solicitudRep;
        this.solicitudRepuestoDetalles = this.solicitudRepuesto.solicitudRepuestoDetalles;
        this.repError = false;
      },
      error => {
        this.repErrorMessage = error.error;
        console.log(error.error + error.message);
        this.repError = true;
      }
    );
  }

  /**
   * Cuando se presiona el botón para crear un nuevo detalle repuesto.
   */
  agregarRepuesto(): void {
    this.isEditDetalle = false;
    this.detalleSeleccionado = null;
    this.modalAddEditDetalleOpen = true;
  }

  /**
   * Cuando se selecciona un detalle repuesto para editar sus datos.
   */
  editarRepuesto(repuesto: SolicitudRepuestoDetalle): void {
    this.detalleSeleccionado = repuesto;
    this.isEditDetalle = true;
    this.eliminarDetalleRepuesto(this.detalleSeleccionado, false);
    this.modalAddEditDetalleOpen = true;
  }

  /**
   * Se quita de la lista de detalles el repuesto que se quiere  editar.
   */
  eliminarDetalleRepuesto(repuestoSeleccionado: SolicitudRepuestoDetalle, isAccionEliminar: boolean): void {
    for (let i = 0; i < this.solicitudRepuestoDetalles.length; i++) {
      if (repuestoSeleccionado.id === this.solicitudRepuestoDetalles[i].id) {
        this.solicitudRepuestoDetalles.splice(i, 1);
        break;
      }
    }

    if (isAccionEliminar) {
      if (this.solicitudRepuestoDetalles.length < 1) {
        if (this.solicitudRepuesto.estado == EstadoSolicitudRepuesto.PENDIENTE_EN_ORDEN_TRABAJO) {
          this.solicitudRepuesto.estado = EstadoSolicitudRepuesto.PENDIENTE;
          this.updateSolicitudRepuesto(this.solicitudRepuesto, true, true);
        } else {
          this.solicitudRepuesto = null;
          this.solicitudRepId = null;
        }
      }
    }
  }

  /**
   * El repuesto creado o editado es agregado a la lista de detalles de la solicitud de repuestos.
   * @param value
   */
  addEditRepuesto(value: SolicitudRepuestoDetalle) {
    this.fueActualizada = true;
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
    if (this.isEditDetalle) {
      if (this.solicitudRepuesto != null) {
        this.solicitudRepuestoDetalles = this.solicitudRepuesto.solicitudRepuestoDetalles;
      }
      if (value != null) {
        this.solicitudRepuestoDetalles.push(value);
      }
      this.detalleSeleccionado = null;
    }
    this.modalAddEditDetalleOpen = false;
  }


  /**
   * Cuando se guarda la información introducida.
   */
  onSaveAddOrdenTrabajo() {
    if (this.solicitudRepuestoDetalles != null && this.solicitudRepuestoDetalles.length > 0) {
      // Si la solicitud de repuesto se crea a partir de la orden de trabajo
      if (this.solicitudRepuesto == null) {
        this.esNuevaSolicitudRepuesto = true;
        this.solicitudRepuesto = new SolicitudRepuesto(null, EstadoSolicitudRepuesto.PENDIENTE_EN_ORDEN_TRABAJO,
          this.solicitudRepuestoDetalles, new Date());
      } else {
        // si se obtuvo una solicitud de repuesto buscando por su Id
        this.solicitudRepuesto.estado = EstadoSolicitudRepuesto.PENDIENTE_EN_ORDEN_TRABAJO;
        this.solicitudRepuesto.solicitudRepuestoDetalles = this.solicitudRepuestoDetalles;
      }
    } else {
      if (this.solicitudRepuesto != null) {
        this.solicitudRepuesto = null;
      }
    }

    if (this.fechaRealizacion != null && (typeof this.fechaRealizacion === 'string' || this.fechaRealizacion instanceof String)) {
      let parts = this.fechaRealizacion.split('/');
      this.fechaRealizacion = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    this.ordenTrabajo = new OrdenTrabajo(null, this.estado, this.tipoServicio, this.diagnostico, this.responsable,
      this.equipoSeleccionado, null, null, this.fechaRealizacion);

    if (this.esNuevaSolicitudRepuesto) {
      this.saveSolicitudRepuesto(this.solicitudRepuesto);
    } else if (this.fueActualizada) {
      this.updateSolicitudRepuesto(this.solicitudRepuesto, false, true);
    } else {
      this.ordenTrabajo.solicitudRepuesto = this.solicitudRepuesto;
      this.saveOrdenTrabajo(this.ordenTrabajo);
    }
  }

  /**
   * Se crea una nueva solicitud de repuestos asociada a la orden de trabajo creada.
   * @param solicitud
   */
  saveSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.solicitudRepuestoService.crearSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
        this.solicitudRepuestoService.emitExisteSolicitudRepuesto(true);
        this.ordenTrabajo.solicitudRepuesto = this.solicitudRepuesto;
        this.saveOrdenTrabajo(this.ordenTrabajo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se actualiza la solicitud de repuesto seleccionada para la ordend e trabajo y luego se crea la orden de trabajo
   * @param solicitud la solicitud a actualizar
   * @param isDelete bandera que indica si es una actualizacion por eliminacion de solicitud
   * @param guardarOT bandera que indica si se debe guardar la orden de trabajo
   */
  updateSolicitudRepuesto(solicitud: SolicitudRepuesto, isDelete: boolean, guardarOT: boolean): void {
    this.solicitudRepuestoService.editarSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
        if (guardarOT) {
          this.ordenTrabajo.solicitudRepuesto = this.solicitudRepuesto;
          this.saveOrdenTrabajo(this.ordenTrabajo);
        } else if (isDelete) {
          this.solicitudRepuesto = null;
          this.solicitudRepId = null;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se guarda la orden de trabajo creada.
   * @param ordenTrabajo
   */
  saveOrdenTrabajo(ordenTrabajo: OrdenTrabajo) {
    this.ordenTrabajoService.editarOrdenTrabajo(ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        if (this.ordenTrabajo.equipo != null) {
          this.ordenTrabajo.equipo.estado = EstadoEquipo.OPERATIVO;
          this.updateEquipo(this.ordenTrabajo.equipo, false);
        } else {
          this.goBack();
        }
        this.limpiarCampos();
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.error = true;
      }
    );
  }

  updateEquipo(equipo: Equipo, isDelete: boolean): void {
    this.equipoService.editarEquipo(equipo).subscribe(
      respuesta => {
        console.log(respuesta)
        if (isDelete) {
          this.clearDatosEquipos();
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message);
        this.error = true;
      }
    );
  }

  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
  }

  limpiarCampos(): void {
    this.clearDatosEquipos();
    this.equipoSeleccionado = null;
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
    this.requestEquipo = null;

    this.solicitudRepId = null;
    this.detalleSeleccionado = null;
    this.solicitudRepuestoDetalles = [];

    this.equipoWarningMessage = '';
    this.equipoWarning = false;
    this.repErrorMessage = '';
    this.repError = false;
  }

}

