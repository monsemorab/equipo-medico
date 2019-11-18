import {Component, OnInit} from '@angular/core';
import {Equipo} from "../../../../domain/equipo";
import {SolicitudServicio} from "../../../../domain/solicitud";
import {Router} from "@angular/router";
import {ParamsBusquedaEquipo} from "../../../../domain/ParamsBusquedaEquipo";
import {EquipoService} from "../../../../service/equipo.service";
import {SolicitudServicioService} from "../../../../service/solicitud-servicio.service";

@Component({
  selector: 'app-add-solicitud-servicio',
  templateUrl: './add-solicitud-servicio.component.html',
  styleUrls: ['./add-solicitud-servicio.component.css']
})
export class AddSolicitudServicioComponent implements OnInit {

  // Datos solicitud servicio.
  solicitudServicio: SolicitudServicio;
  estado: string;
  descripcionProblema: string;
  personalReporte: string;
  fecha: any;
  equipos: Equipo [];

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;
  showAgregarBtn = false;

  // error
  errorMessage: string;
  error: boolean;


  constructor(private router: Router,
              private equipoService: EquipoService,
              private solicitudServicioService: SolicitudServicioService) {
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
   * Se crea la solicitud de servicio con los datos introducidos.
   */
  onSaveServicio(): void {
    this.solicitudServicio = new SolicitudServicio(null, 'Servicio', this.estado, this.descripcionProblema,
      this.personalReporte, this.equipos, this.fecha);
    this.saveServicio(this.solicitudServicio);
  }


  /**
   * Se crea una nueva solicitud de servicio.
   * @param servicio
   */
  saveServicio(servicio: SolicitudServicio): void {
    this.solicitudServicioService.crearSolicitudServicio(servicio).subscribe(
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
