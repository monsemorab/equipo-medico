import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Equipo} from '../../../../domain/equipo';
import {ParamsBusquedaEquipo} from '../../../../domain/ParamsBusquedaEquipo';
import {EquipoService} from '../../../../service/equipo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {OrdenTrabajo, TipoServicio} from '../../../../domain/orden-trabajo';
import {Repuesto} from '../../../../domain/repuesto';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';

@Component({
  selector: 'app-add-orden-trabajo',
  templateUrl: './add-orden-trabajo.component.html',
  styleUrls: ['./add-orden-trabajo.component.css']
})
export class AddOrdenTrabajoComponent implements OnInit {

  // orden trabajo
  ordenTrabajo: OrdenTrabajo;
  estado: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fecha: any;
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

  // modal para agregar/editar repuestos
  modalAddEditRepuestoOpen = false;
  repuestoSeleccionado: Repuesto;
  isEditRepuesto: boolean;
  repuestos = new Array<Repuesto>();


  // Errors
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
    this.limpiarCampos();
    this.getTipoServicios();
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
    this.equipos.push(this.equipoSeleccionado);
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
    this.solicitudRepuestoService.getSolicitudRepuestoById(this.solicitudRepId).subscribe(
      solicitudRep => {
        this.solicitudRepuesto = solicitudRep;
        this.repuestos = this.solicitudRepuesto.repuestos;
      },
      error => {
        this.repErrorMessage = error;
        this.repError = true;
      }
    );
  }

  /**
   * Cuando se presiona el botón para crear un nuevo repuesto.
   */
  agregarRepuesto(): void {
    this.repuestoSeleccionado = null;
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Cuando se selecciona un repuesto para editar sus datos.
   */
  editarRepuesto(): void {
    this.eliminarRepuesto(this.repuestoSeleccionado);
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Se quita de la lista de repuestos existentes, el repuesto que se quiere  editar.
   */
  eliminarRepuesto(repuestoSeleccionado: Repuesto): void {
    for (let i = 0; i < this.repuestos.length; i++) {
      if (repuestoSeleccionado.id === this.repuestos[i].id) {
        this.repuestos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando se selecciona un repuesto de la lista.
   * @param repuesto
   */
  selectRepuesto(repuesto: Repuesto): void {
    this.repuestoSeleccionado = repuesto;
  }

  /**
   * El repuesto creado o editado es agregado a la lista de repuestos.
   * @param value
   */
  addEditRepuesto(value: Repuesto) {
    this.repuestos.push(value);
    this.repuestoSeleccionado = null;
    this.isEditRepuesto = true;
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
      this.repuestos.push(value);
      this.repuestoSeleccionado = null;
    }
    this.modalAddEditRepuestoOpen = false;
  }


  /**
   * Cuando se guarda la información introducida.
   */
  onSaveAddOrdenTrabajo() {
    // Si la solicitud de repuesto se crea a partir de la orden de trabajo
    if (this.solicitudRepuesto == null) {
      this.solicitudRepuesto = new SolicitudRepuesto(null, 'Pendiente', this.repuestos, new Date());
    } else {
      // si se obtuvo una solicitud de repuesto buscando por su Id
      this.solicitudRepuesto.repuestos = this.repuestos;
    }
    this.ordenTrabajo = new OrdenTrabajo(null, this.estado, this.tipoServicio, null, this.diagnostico,
      this.responsable, this.equipos, this.solicitudRepuesto, this.fecha);
    this.saveOrdenTrabajo(this.ordenTrabajo);
  }

  /**
   * Se guarda la orden de trabajo creada.
   * @param ordenTrabajo
   */
  saveOrdenTrabajo(ordenTrabajo: OrdenTrabajo) {
    this.ordenTrabajoService.crearOrdenTrabajo(ordenTrabajo).subscribe(
      orden => {
        this.ordenTrabajo = orden;
        this.limpiarCampos();
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajo = null;
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
