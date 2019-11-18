import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SolicitudRepuesto, SolicitudServicio} from "../../../domain/solicitud";
import {Equipo} from "../../../domain/equipo";
import {ParamsBusquedaEquipo} from "../../../domain/ParamsBusquedaEquipo";
import {EquipoService} from "../../../service/equipo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SolicitudRepuestoService} from "../../../service/solicitud-repuesto.service";
import {OrdenTrabajo} from "../../../domain/orden-trabajo";

@Component({
  selector: 'app-add-orden-trabajo',
  templateUrl: './add-orden-trabajo.component.html',
  styleUrls: ['./add-orden-trabajo.component.css']
})
export class AddOrdenTrabajoComponent implements OnInit {

  // solicitud de servicio
  @Input() solicitudServicio: SolicitudServicio;
  @Input() isFromSolicitudServ: boolean;

  @Output() onCancelOrSave: EventEmitter<any> = new EventEmitter();

  // orden trabajo
  orderTrabajo: OrdenTrabajo;

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;

  // solicitud repuesto
  codigoSolRep: string;
  solicitudRepuesto: SolicitudRepuesto;
  selectedRepuesto: SolicitudRepuesto;


  // Errors
  equipoErrorMessage: string;
  equipoError: boolean;
  repErrorMessage: string;
  repError: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private equipoService: EquipoService,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
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
    this.clearDatosEquipos();
    this.requestEquipo = new ParamsBusquedaEquipo(nroSerie, nroPatrimonial);
    this.equipoService.getEquipoByParams(this.requestEquipo).subscribe(
      equipo => {
        this.equipoSeleccionado = equipo;
      },
      error => {
        this.equipoErrorMessage = error;
        this.equipoError = true;
      }
    );
  }

  /**
   * Se limpian los campos del equipo buscado.
   */
  clearDatosEquipos() {
    this.equipoSeleccionado = null;
    this.onKeyNroSerie("");
    this.onKeyNroPatrimonial("");
  }

  /**
   * Cuando se presiona el botón Add de la sección Solicitud de Repuestos.
   * Se busca la solicitud de repuestos que coincida con el código introducido,
   * si la solicitud existe, se agrega a la lista de solicitud de repuestos,
   * si no existe se muestra un mensaje al usuario.
   */
  buscarSolicitudRepuesto() {
    this.solicitudRepuestoService.getSolicitudRepuestoByCodigo(this.codigoSolRep).subscribe(
      solicitudRep => {
        this.solicitudRepuesto = solicitudRep;
      },
      error => {
        this.repErrorMessage = error;
        this.repError = true;
      }
    );
  }

  /**
   * Se redirige a la pagina crear solicitud de repuestos, al presionar el boton crear
   * de la sección Solicitud de Repuestos
   */
  crearSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/repuestos/crear-solicitud-repuesto']);
  }


  /**
   * Cuando se presiona sobre el botón cancelar
   */
  onCancelAddOrdenTrabajo() {
    this.onCancelOrSave.emit(true);
    this.limpiarCampos();
  }

  /**
   * Cuando se guarda la información introducida.
   */
  onSaveAddOrdenTrabajo() {
    this.orderTrabajo = new OrdenTrabajo(null, '', this.equipoSeleccionado, null, '',
      this.solicitudRepuesto, this.solicitudServicio);

    this.saveOrdenTrabajo(this.orderTrabajo);
    if (this.isFromSolicitudServ) {
      this.onCancelOrSave.emit(true);
    }
  }

  /**
   * Se guarda la orden de trabajo creada.
   * @param orderTrabajo
   */
  saveOrdenTrabajo(orderTrabajo: OrdenTrabajo) {

  }

  limpiarCampos(): void {
    this.solicitudServicio = null;
    this.equipoSeleccionado = null;
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
    this.requestEquipo = null;

    this.codigoSolRep = '';
    this.solicitudRepuesto = null;
    this.selectedRepuesto = null;

    this.equipoErrorMessage = '';
    this.equipoError = false;
    this.repErrorMessage = '';
    this.repError = false;
  }

}
