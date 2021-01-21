import { Component, OnInit } from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {Contrato} from "../../../domain/contrato";
import {ContratoService} from "../../../service/contrato.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-informe-contratos',
  templateUrl: './informe-contratos.component.html',
  styleUrls: ['./informe-contratos.component.css']
})
export class InformeContratosComponent implements OnInit {

  // Datos Contrato
  contrato: Contrato;
  numeroContrato: string;
  fechaInicio: any;
  fechaFin: any;

  // Datos Equipo
  equipos: Equipo[];

  // Errors
  errorMessage: string;
  error:boolean;
  info: boolean;

  constructor(private contratoService: ContratoService) { }

  ngOnInit(): void {
    this.numeroContrato = '';
  }

  /**
   * Al presionar la tecla enter, se realiza la busqueda del contrato por el campo Nro. de Contrato.
   * @param value
   */
  onEnterContrato(value: string) {
    this.info = false;
    if (value !== '' && value != null) {
      this.numeroContrato = value;
      this.buscarContrato(this.numeroContrato);
    }
  }


  /**
   * Se obtiene el valor introducido en el campo nro. contrato.
   * @param value
   */
  onKeyNroContrato(value: string) {
    this.numeroContrato = value;
  }

  buscarContrato(nroContrato: string) {
    this.contratoService.getContratoByNroContrato(nroContrato).subscribe(
      contrato => {
        this.contrato = contrato;
        this.equipos = contrato.equipos;
        const datepipe: DatePipe = new DatePipe('en-ES');
        this.fechaInicio = datepipe.transform(contrato.fechaInicio, 'yyyy-MM-dd');
        this.fechaFin = datepipe.transform(contrato.fechaFin, 'yyyy-MM-dd');
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        if (this.errorMessage == null && error.status == '404') {
          this.errorMessage = 'No existe el contrato buscado ';
          this.info = true;
        } else {
          console.log(this.errorMessage)
          this.error = true;
        }
      }
    );
  }

}
