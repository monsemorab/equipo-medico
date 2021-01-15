import { Component, OnInit } from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {ParamsBusquedaEquipo} from "../../../domain/ParamsBusquedaEquipo";
import {EquipoService} from "../../../service/equipo.service";
import {DatePipe} from "@angular/common";
import {Mantenimiento} from "../../../domain/mantenimiento";
import {SolicitudRepuesto} from "../../../domain/solicitud-repuesto";

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

  // repuesto
  solRepuestos: SolicitudRepuesto[];
  fehcaIniRepuesto: any;
  fechaFinRepuesto: any;

  // Errors
  errorMessage: string;
  error:boolean;

  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
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
        this.camposEquipo(equipo);
        this.error = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  camposEquipo(equipo: Equipo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.fechaFabricacion = equipo.fechaFabricacion;
    this.fechaVenGarantia = datepipe.transform(equipo.fechaVenGarantia, 'yyyy-MM-dd');
    this.fechaInstalacion = datepipe.transform(equipo.fechaInstalacion, 'yyyy-MM-dd');
    this.fechaCompra  = datepipe.transform(equipo.fechaCompra, 'yyyy-MM-dd');
  }

}
