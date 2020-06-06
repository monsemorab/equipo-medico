import {Component, OnInit} from '@angular/core';
import {Contrato} from '../../../domain/contrato';
import {Router} from '@angular/router';
import {ContratoService} from '../../../service/contrato.service';
import {DatePipe} from "@angular/common";

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

  constructor(private router: Router,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedContrato = null;
    this.numeroContrato = "";
    this.getAllContratos();
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
        console.log(this.errorMessage)
        this.contratos = [];
        this.loading = false;
      }
    );
  }

  filtrarContrato(): void {
    this.info = false;
    this.infoMessage = "";
    if (this.numeroContrato != "") {
      this.filtrarContratoPorNroContrato(this.numeroContrato);
    } else {
      this.getAllContratos();
    }
  }

  /**
   * Se obtienen los contratos que coincidad con el nro de contrato introducido
   * @param numeroContrato
   */
  filtrarContratoPorNroContrato(numeroContrato: string): void {
    this.contratoService.getContratoByNroContrato(numeroContrato).subscribe(
      list => {
        this.contratos = list;
        this.formateoFechas();
        this.total = list.length;
        if (this.total == 0) {
          this.info = true;
          this.infoMessage = "No se encontraron registros para esta busqueda.";
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
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
    if(this.selectedContrato!= null && this.selectedContrato.id == contrato.id) {
      this.selectedContrato = null;
    } else {
      this.selectedContrato = contrato;
    }
    console.log('selectedContrato ', this.selectedContrato);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editContrato() {
    this.router.navigate(['home/contratos/editar-contrato/' + this.selectedContrato.id]);
  }

}
