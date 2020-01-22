import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Equipo} from '../../../../domain/equipo';
import {ParamsBusquedaEquipo} from '../../../../domain/ParamsBusquedaEquipo';
import {EquipoService} from '../../../../service/equipo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {OrdenTrabajo} from '../../../../domain/orden-trabajo';

@Component({
  selector: 'app-add-orden-trabajo',
  templateUrl: './add-orden-trabajo.component.html',
  styleUrls: ['./add-orden-trabajo.component.css']
})
export class AddOrdenTrabajoComponent implements OnInit {

  // orden trabajo
  orderTrabajo: OrdenTrabajo;
  estado: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fecha: any;
  equipos: Equipo [];

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;
  showAgregarBtn = false;

  // solicitud repuesto
  codigoSolRep: string;
  solicitudRepuestos: SolicitudRepuesto[];
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
    this.equipos = [];
    this.clearDatosEquipos();
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
   * Cuando se presiona el botón Add de la sección Solicitud de Repuestos.
   * Se busca la solicitud de repuestos que coincida con el código introducido,
   * si la solicitud existe, se agrega a la lista de solicitud de repuestos,
   * si no existe se muestra un mensaje al usuario.
   */
  buscarSolicitudRepuesto() {
    // this.solicitudRepuestoService.getSolicitudRepuestoByCodigo(this.codigoSolRep).subscribe(
    //   solicitudRep => {
    //     this.solicitudRepuesto = solicitudRep;
    //   },
    //   error => {
    //     this.repErrorMessage = error;
    //     this.repError = true;
    //   }
    // );
  }

  /**
   * Se redirige a la pagina crear solicitud de repuestos, al presionar el boton crear
   * de la sección Solicitud de Repuestos
   */
  crearSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/repuestos/crear-solicitud-repuesto']);
  }


  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
  }

  /**
   * Cuando se guarda la información introducida.
   */
  onSaveAddOrdenTrabajo() {
    this.orderTrabajo = new OrdenTrabajo(null, this.estado, this.tipoServicio, null, this.diagnostico,
      this.responsable, this.equipos, this.solicitudRepuestos, this.fecha);
    this.saveOrdenTrabajo(this.orderTrabajo);
  }

  /**
   * Se guarda la orden de trabajo creada.
   * @param orderTrabajo
   */
  saveOrdenTrabajo(orderTrabajo: OrdenTrabajo) {

  }

  limpiarCampos(): void {
    this.equipoSeleccionado = null;
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
    this.requestEquipo = null;

    this.codigoSolRep = '';
    this.selectedRepuesto = null;

    this.equipoErrorMessage = '';
    this.equipoError = false;
    this.repErrorMessage = '';
    this.repError = false;
  }

}
