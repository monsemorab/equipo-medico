import { Component, OnInit } from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {ParamsBusquedaEquipo} from "../../../domain/ParamsBusquedaEquipo";
import {EquipoService} from "../../../service/equipo.service";
import {DatePipe} from "@angular/common";
import {Mantenimiento} from "../../../domain/mantenimiento";
import {ManteniminetoService} from "../../../service/mantenimineto.service";
import {SolicitudRepuestoDetalle} from "../../../domain/solicitud-repuesto-detalle";
import {SolicitudRepuestoDetalleService} from "../../../service/solicitud-repuesto-detalle.service";

@Component({
  selector: 'app-informe-equipos',
  templateUrl: './informe-equipos.component.html',
  styleUrls: ['./informe-equipos.component.css']
})
export class InformeEquiposComponent implements OnInit {

  // Datos Equipo
  equipoSeleccionado: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  requestEquipo: ParamsBusquedaEquipo;
  fechaFabricacion: any;
  fechaVenGarantia: any;
  fechaInstalacion: any;
  fechaCompra: any;

  // mantenimiento
  mantenimientos: Mantenimiento[];
  fehcaIniServicio: any;
  fechaFinServicio: any;
  habilitarBtnManFilter = false;

  // repuesto
  solRepuestosDet: SolicitudRepuestoDetalle[];
  fehcaIniRepuesto: any;
  fechaFinRepuesto: any;
  habilitarBtnRepFilter = false;

  // Errors
  errorMessage: string;
  error:boolean;
  info: boolean;

  constructor(private equipoService: EquipoService,
              private mantenimientoService: ManteniminetoService,
              private solicitudRepuestoDetalleService: SolicitudRepuestoDetalleService) { }

  ngOnInit() {
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
  }

  /**
   * Al presionar la tecla enter, se realiza la busqueda del equipo por el campo Nro. de serie.
   * @param value
   */
  onEnterNroSerie(value: string) {
    this.habilitarBtnManFilter = false;
    this.habilitarBtnRepFilter  = false;
    this.info = false;
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
    this.habilitarBtnManFilter = false;
    this.habilitarBtnRepFilter  = false;
    this.info = false;
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
        this.camposEquipo(equipo);
        this.buscarMantenimientoByEquipo(equipo.id);
        this.error = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        if (this.errorMessage == null && error.status == '404') {
          this.errorMessage = 'No existe el equipo buscado ';
          this.info = true;
        } else {
          console.log(this.errorMessage)
          this.error = true;
        }
      }
    );
  }

  /**
   * Se obtiene la lista de mantenimientos realizados a los equipos
   * @param equipoId
   */
  buscarMantenimientoByEquipo(equipoId: number): void {
    this.mantenimientoService.getAllMantenimientoByEquipoId(equipoId).subscribe(
      mantenimientos => {
        this.mantenimientos = mantenimientos;
        if(mantenimientos.length > 0) {
          this.habilitarBtnManFilter = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Se obtiene la lista de mantenimientos realizados a los equipos por rango de fechas
   * @param equipoId
   * @param fehcaIni
   * @param fechaFin
   */
  buscarMantenimientoByEquipoAndRangoFechas(equipoId: number, fehcaIni: any, fechaFin: any): void {
    this.mantenimientoService.getAllMantenimientoByEquipoIdAndFecha(equipoId, fehcaIni, fechaFin).subscribe(
      mantenimientos => {
        this.mantenimientos = mantenimientos;
        if(mantenimientos.length > 0) {
          this.habilitarBtnManFilter = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Filtrar por rango de fechas la lista de mantenimientos de un equipo
   */
  filtrarManteniiento():void {
    if(this.fehcaIniServicio != '' && this.fechaFinServicio!= '') {
      this.buscarMantenimientoByEquipoAndRangoFechas(this.equipoSeleccionado.id, this.fehcaIniServicio, this.fechaFinServicio);
    } else {
      this.buscarMantenimientoByEquipo(this.equipoSeleccionado.id);
    }
  }


  /**
   * Se obtiene la lista de mantenimientos realizados a los equipos
   * @param equipoId
   */
  buscarSolicitudRepuestosByEquipo(equipoId: number): void {
    this.solicitudRepuestoDetalleService.getAllSolicitudRepuestosDetByEquipoId(equipoId).subscribe(
      detalles => {
        this.solRepuestosDet = detalles;
        if(detalles.length > 0) {
          this.habilitarBtnRepFilter = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Se obtiene la lista de mantenimientos realizados a los equipos por rango de fechas
   * @param equipoId
   * @param fehcaIni
   * @param fechaFin
   */
  buscarSolicitudRepuestosByEquipoAndRangoFechas(equipoId: number, fehcaIni: any, fechaFin: any): void {
    this.solicitudRepuestoDetalleService.getAllSolicitudRepuestosDetByEquipoIdAndFecha(equipoId, fehcaIni, fechaFin).subscribe(
      detalles => {
        this.solRepuestosDet = detalles;
        if(detalles.length > 0) {
          this.habilitarBtnRepFilter = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Filtrar por fechas la lista de solicitud de repuestos de un equipo
   */
  filtrarRepuestos():void {
    if(this.fehcaIniRepuesto != '' && this.fechaFinRepuesto!= '') {
      this.buscarSolicitudRepuestosByEquipoAndRangoFechas(this.equipoSeleccionado.id, this.fehcaIniRepuesto, this.fechaFinRepuesto);
    } else {
      this.buscarSolicitudRepuestosByEquipo(this.equipoSeleccionado.id);
    }
  }

  camposEquipo(equipo: Equipo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.fechaFabricacion = equipo.fechaFabricacion;
    this.fechaVenGarantia = datepipe.transform(equipo.fechaVenGarantia, 'yyyy-MM-dd');
    this.fechaInstalacion = datepipe.transform(equipo.fechaInstalacion, 'yyyy-MM-dd');
    this.fechaCompra  = datepipe.transform(equipo.fechaCompra, 'yyyy-MM-dd');
  }

}
