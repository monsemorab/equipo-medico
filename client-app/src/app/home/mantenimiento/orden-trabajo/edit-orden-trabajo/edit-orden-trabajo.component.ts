import {Component, OnInit} from '@angular/core';
import {OrdenTrabajo, TipoServicio} from '../../../../domain/orden-trabajo';
import {Equipo} from '../../../../domain/equipo';
import {ParamsBusquedaEquipo} from '../../../../domain/ParamsBusquedaEquipo';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Repuesto} from '../../../../domain/repuesto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EquipoService} from '../../../../service/equipo.service';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";

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
  equipos: Equipo [];

  // Tipo de Servicios
  servicioSeleccionado: TipoServicio;
  tipoServicios: TipoServicio[];

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;
  showAgregarBtn = false;

  // solicitud repuesto
  solicitudRepId: number;
  solicitudRepuesto: SolicitudRepuesto;
  esNuevaSolicitudRepuesto: boolean;
  fueActualizada: boolean;

  // modal para agregar/editar repuestos
  modalAddEditRepuestoOpen = false;
  repuestoSeleccionado: Repuesto;
  isEditRepuesto: boolean;
  repuestos = new Array<Repuesto>();


  // Errors
  error: boolean;
  errorMessage: string;
  equipoErrorMessage: string;
  equipoError: boolean;
  repErrorMessage: string;
  repError: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private equipoService: EquipoService,
              private ordenTrabajoService: OrdenTrabajoService,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.equipos = [];
    this.esNuevaSolicitudRepuesto = false;
    this.fueActualizada = false;
    this.limpiarCampos();
    this.getTipoServicios();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.ordenTrabajoService.getOrdenTrabajoById(+params.get('id')))
      ).subscribe(orden => {
        this.ordenTrabajo = new OrdenTrabajo(orden.id, orden.estado, orden.tipoServicio, orden.mantenimiento,
          orden.diagnostico, orden.responsable, orden.equipos, orden.solicitudRepuesto, orden.fechaRealizacion);
        this.camposAEditar(this.ordenTrabajo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
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
        console.log(this.errorMessage)
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
    if(orden.fechaRealizacion != null) {
      this.fechaRealizacion = datepipe.transform(orden.fechaRealizacion, 'MM/dd/yyyy');
    }
    this.equipos = orden.equipos;
    this.solicitudRepuesto = orden.solicitudRepuesto;
    if (this.solicitudRepuesto != null) {
      this.solicitudRepId = this.solicitudRepuesto.id;
      this.repuestos = this.solicitudRepuesto.repuestos;
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
        this.showAgregarBtn = this.equipoSeleccionado != null;
        this.equipoError = false;
      },
      error => {
        this.equipoErrorMessage = error;
        this.equipoError = true;
        this.showAgregarBtn = false;
      }
    );
  }

  /**
   * Se limpian los campos del equipo buscado.
   */
  clearDatosEquipos() {
    this.equipoSeleccionado = null;
    this.onKeyNroSerie('');
    this.onKeyNroPatrimonial('');
    this.showAgregarBtn = false;
  }

  /**
   * Se agrega el equipo obtenido de la busqueda a la lista de equipos.
   */
  onAddEquipo(): void {
    if (this.equipos.length === 0) {
      this.equipos.push(this.equipoSeleccionado);
    } else {
      let cont = -1;
      for (let i = 0; i < this.equipos.length; i++) {
        if (this.equipoSeleccionado.id !== this.equipos[i].id) {
          cont++;
        }
      }
      if (cont === this.equipos.length) {
        this.equipos.push(this.equipoSeleccionado);
      } else {
        this.equipoErrorMessage = "El equipo ya está incluido en la lista de Equipos";
        this.equipoError = true;
      }
    }
    this.clearDatosEquipos();
  }

  /**
   * Se elimina de la lista de equipos, el equipo seleccionado.
   * @param id
   */
  onRemoveEquipo(id: number): void {
    for (let i = 0; i < this.equipos.length; i++) {
      if (id === this.equipos[i].id) {
        this.equipos.splice(i, 1);
        break;
      }
    }
  }

  /**
   *Se busca la solicitud de repuestos que coincida con el id introducido,
   * si la solicitud existe, se muestra la lista de repuestos agregados,
   * si no existe se muestra un mensaje al usuario.
   */
  buscarSolicitudRepuestoById() {
    if (this.solicitudRepId != null) {
      this.solicitudRepuestoService.getSolicitudRepuestoById(this.solicitudRepId).subscribe(
        solicitudRep => {
          this.solicitudRepuesto = solicitudRep;
          this.repuestos = this.solicitudRepuesto.repuestos;
          this.repError = false;
        },
        error => {
          this.repErrorMessage = error.error;
          console.log(this.repErrorMessage);
          this.repError = true;
        }
      );
    } else {
      this.repErrorMessage = 'Debe ingresar el Id de la Solicitud de Repuestos';
      this.repError = true;
    }
  }

  /**
   * Cuando se presiona el botón para crear un nuevo repuesto.
   */
  agregarRepuesto(): void {
    this.repuestoSeleccionado = null;
    this.isEditRepuesto = false;
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Cuando se selecciona un repuesto para editar sus datos.
   */
  editarRepuesto(repuesto: Repuesto): void {
    this.repuestoSeleccionado = repuesto;
    this.isEditRepuesto = true;
    this.eliminarRepuesto(this.repuestoSeleccionado, false);
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Se quita de la lista de repuestos existentes, el repuesto que se quiere  editar.
   */
  eliminarRepuesto(repuestoSeleccionado: Repuesto, isAccionEliminar: boolean): void {
    for (let i = 0; i < this.repuestos.length; i++) {
      if (repuestoSeleccionado.id === this.repuestos[i].id) {
        this.repuestos.splice(i, 1);
        break;
      }
    }

    if(isAccionEliminar) {
      if(this.repuestos.length < 1) {
        this.solicitudRepuesto = null;
        this.solicitudRepId = null;
      }
    }
  }

  /**
   * El repuesto creado o editado es agregado a la lista de repuestos.
   * @param value
   */
  addEditRepuesto(value: Repuesto) {
    this.fueActualizada = true;
    this.repuestos.push(value);
    this.repuestoSeleccionado = null;
    this.modalAddEditRepuestoOpen = false;
  }

  /**
   * Cuando se cancela la edición de un repuesto, el repuesto seleccionado se agrega de nuevo a la lista de
   * repuestos.
   * @param value
   */
  onCancelAddEditRepuesto(value: Repuesto) {
    if (this.isEditRepuesto) {
      if (this.solicitudRepuesto != null) {
        this.repuestos = this.solicitudRepuesto.repuestos;
      }
      if (value != null) {
        this.repuestos.push(value);
      }
      this.repuestoSeleccionado = null;
    }
    this.modalAddEditRepuestoOpen = false;
  }


  /**
   * Cuando se guarda la información introducida.
   */
  onSaveAddOrdenTrabajo() {
    if (this.repuestos != null && this.repuestos.length > 0) {
      // Si la solicitud de repuesto se crea a partir de la orden de trabajo
      if (this.solicitudRepuesto == null) {
        this.esNuevaSolicitudRepuesto = true;
        this.solicitudRepuesto = new SolicitudRepuesto(null, 'Pendiente', this.repuestos, new Date());
      } else {
        // si se obtuvo una solicitud de repuesto buscando por su Id
        this.solicitudRepuesto.repuestos = this.repuestos;
      }
    } else {
      if (this.solicitudRepuesto != null) {
        this.solicitudRepuesto = null;
      }
    }

    if (typeof this.fechaRealizacion === 'string' || this.fechaRealizacion instanceof String) {
      let parts = this.fechaRealizacion.split('/');
      this.fechaRealizacion = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    this.ordenTrabajo = new OrdenTrabajo(this.id, this.estado, this.tipoServicio, null, this.diagnostico,
      this.responsable, this.equipos, null, this.fechaRealizacion);

    if (this.esNuevaSolicitudRepuesto) {
      this.saveSolicitudRepuesto(this.solicitudRepuesto);
    } else if (this.fueActualizada) {
      this.updateSolicitudRepuesto(this.solicitudRepuesto);
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
   * @param solicitud
   */
  updateSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.solicitudRepuestoService.editarSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
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
   * Se guarda la orden de trabajo creada.
   * @param ordenTrabajo
   */
  saveOrdenTrabajo(ordenTrabajo: OrdenTrabajo) {
    this.ordenTrabajoService.editarOrdenTrabajo(ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        if(this.ordenTrabajo.equipos != null) {
          this.onUpdateEstadoEquipos(this.ordenTrabajo.equipos);
        } else {
          this.goBack();
        }
        this.limpiarCampos();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  onUpdateEstadoEquipos(equipos: Equipo[]): void {
    for (let i = 0; i < equipos.length; i++) {
      if(equipos[i].estado != 'Inoperativo') {
        equipos[i].estado = 'Inoperativo';
        this.updateEquipo(equipos[i]);
      }
    }
    this.goBack();
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
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
  }

  limpiarCampos(): void {
    this.clearDatosEquipos();
    this.equipoSeleccionado = null;
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
    this.requestEquipo = null;

    this.solicitudRepId = null;
    this.repuestoSeleccionado = null;
    this.repuestos = [];

    this.equipoErrorMessage = '';
    this.equipoError = false;
    this.repErrorMessage = '';
    this.repError = false;
  }

}

