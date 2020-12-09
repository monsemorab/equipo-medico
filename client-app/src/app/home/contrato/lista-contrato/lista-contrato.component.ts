import {Component, OnInit} from '@angular/core';
import {Contrato, EstadoContrato} from '../../../domain/contrato';
import {Router} from '@angular/router';
import {ContratoService} from '../../../service/contrato.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lista-contrato',
  templateUrl: './lista-contrato.component.html',
  styleUrls: ['./lista-contrato.component.css']
})
export class ListaContratoComponent implements OnInit {

  // contrato
  selectedContrato: Contrato;
  numeroContrato: string;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  contratos: Contrato[];

  // filtro
  estadosContrato: EstadoContrato[];
  estadoContrato: string;
  selectedEstado: string;
  tipoProcedimiento: string;

  constructor(private router: Router,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedContrato = null;
    this.numeroContrato = '';
    this.tipoProcedimiento = '';
    this.estadoContrato = 'Filtrar por Estado Contrato';
    this.getAllContratos();
    this.getEstadoContratos();
  }

  getAllContratos(): void {
    this.contratoService.getAllContratos().subscribe(
      list => {
        this.contratos = list;
        this.formateoFechas();
        this.total = list.length;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.contratos = [];
        this.loading = false;
      }
    );
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   */
  getEstadoContratos(): void {
    this.contratoService.getEstadosContrato().subscribe(
      estados => {
        this.estadosContrato = estados;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.estadosContrato = [];
      }
    );
  }

  /**
   * Se selecciona un estado para el contrato.
   * @param value
   */
  onSelectedEstadoContrado(value: string): void {
    this.estadoContrato = value;
    this.selectedEstado = '';
    this.selectedEstado = 'estadoContrato=' + value;
  }

  filtrarContrato(): void {
    this.info = false;
    this.infoMessage = '';
    if (this.estadoContrato == 'Filtrar por Estado Contrato' && this.tipoProcedimiento == '' && this.numeroContrato == '') {
      this.getAllContratos();
    } else {
      let filtros = '';
      if (this.selectedEstado !==  '' ) {
        if (filtros == '') {
          filtros = this.selectedEstado;
        } else {
          filtros = filtros  + '&' + this.selectedEstado;
        }
      }
      if (this.numeroContrato !== '' ) {
        if (filtros == '' ) {
          filtros = 'numeroContrato=' + this.numeroContrato;
        } else {
          filtros = filtros  + '&numeroContrato=' + this.numeroContrato;
        }
      }
      if (this.tipoProcedimiento !== '') {
        if (filtros == '') {
          filtros = 'tipoProcedimiento=' + this.tipoProcedimiento;
        } else {
          filtros = filtros  + '&tipoProcedimiento=' + this.tipoProcedimiento;
        }
      }
      this.getAllContratosFiltrados(filtros);
    }
  }

  /**
   * Se obtienen los contratos que coincida con el filtro ingresado
   */
  getAllContratosFiltrados(filtro: string): void {
    this.contratoService.getContratosFiltrados(filtro).subscribe(
      list => {
        this.contratos = list;
        this.formateoFechas();
        this.total = list.length;
        if (this.total == 0) {
          this.info = true;
          this.infoMessage = 'No se encontraron registros para esta busqueda.';
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.contratos = [];
        this.loading = false;
      }
    );
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for (let i = 0; i < this.contratos.length; i++) {
      this.contratos[i].fechaInicio = datepipe.transform(this.contratos[i].fechaInicio, 'dd-MM-yyyy');
      this.contratos[i].fechaFin = datepipe.transform(this.contratos[i].fechaFin, 'dd-MM-yyyy');
    }
    this.loading = false;
  }

  /**
   * Cuando se presiona el botón Add.
   */
  goNewContratoForm(): void {
    this.router.navigate(['home/contratos/crear-contrato']);
  }

  /**
   * Cuando se selecciona un Contrato de la lista.
   * @param {Contrato} contrato
   */
  selectContrato(contrato: Contrato): void {
    if (this.selectedContrato != null && this.selectedContrato.id == contrato.id) {
      this.selectedContrato = null;
    } else {
      this.selectedContrato = contrato;
    }
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editContrato() {
    this.router.navigate(['home/contratos/editar-contrato/' + this.selectedContrato.id]);
  }

}
