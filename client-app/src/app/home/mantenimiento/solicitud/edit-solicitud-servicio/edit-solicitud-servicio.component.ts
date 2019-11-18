import {Component, OnInit} from '@angular/core';
import {SolicitudServicio} from "../../../../domain/solicitud";
import {Equipo} from "../../../../domain/equipo";
import {ParamsBusquedaEquipo} from "../../../../domain/ParamsBusquedaEquipo";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EquipoService} from "../../../../service/equipo.service";
import {SolicitudServicioService} from "../../../../service/solicitud-servicio.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-edit-solicitud-servicio',
  templateUrl: './edit-solicitud-servicio.component.html',
  styleUrls: ['./edit-solicitud-servicio.component.css']
})
export class EditSolicitudServicioComponent implements OnInit {

  // Datos solicitud servicio.
  solicitudServicio: SolicitudServicio;
  id: number;
  estado: string;
  descripcionProblema: string;
  personalReporte: string;
  fecha: any;
  equipos: Equipo [];

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  tipoEquipo: string;
  modelo: string;
  ubicacion: string;
  contrato: string;
  requestEquipo: ParamsBusquedaEquipo;

  // error
  errorMessage: string;
  error: boolean;

  showAgregarBtn = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private equipoService: EquipoService,
              private solicitudServicioService: SolicitudServicioService) {
  }

  ngOnInit() {
    this.equipos = [];
    this.clearDatosEquipos();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.solicitudServicioService
          .getSolicitudServicioById(+params.get('id')))
      ).subscribe(servicio => {
        this.solicitudServicio = new SolicitudServicio(servicio.id, servicio.tipo, servicio.estado,
          servicio.descripcionProblema, servicio.personalReporte, servicio.equipos, servicio.fechaSolicitud);
        this.camposAEditar(this.solicitudServicio);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      });
  }

  /**
   * Se establecen los campos a ser editados de la solicitud de servicio seleccionado.
   * @param servicio
   */
  camposAEditar(servicio: SolicitudServicio) {
    this.id = servicio.id;
    this.estado = servicio.estado;
    this.descripcionProblema = servicio.descripcionProblema;
    this.personalReporte = servicio.personalReporte;
    this.fecha = servicio.fechaSolicitud;
    this.equipos = servicio.equipos;
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
        this.errorMessage = error;
        this.error = true;
        this.showAgregarBtn = false;
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
    this.tipoEquipo = "";
    this.modelo = "";
    this.ubicacion = "";
    this.contrato = "";
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
   * Se actualiza la solicitud de servicio con los datos modificados.
   */
  onSaveServicio(): void {
    this.solicitudServicio = new SolicitudServicio(this.id, 'Servicio', this.estado, this.descripcionProblema,
      this.personalReporte, this.equipos, this.fecha);
    this.updateServicio(this.solicitudServicio);
  }


  /**
   * Se actualizan los datos de la solicitud de servicio seleccionada.
   * @param servicio
   */
  updateServicio(servicio: SolicitudServicio): void {
    this.solicitudServicioService.editarSolicitudServicio(servicio).subscribe(
      servicio => {
        this.solicitudServicio = servicio;
        this.goBack();
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Regresa a la página del listado de solicitudes de servicios.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/solicitud/lista-solicitud-servicio']);
  }

}
