import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  idContrato: number;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  first = 0;
  rows = 10;
  contratos: Contrato[];

  // filtro
  estadosContrato: EstadoContrato[];
  estadoContrato: string;
  selectedEstado: string;

  selected = new Array<Contrato>();
  @ViewChild("exportData") downloadLink: ElementRef;


  constructor(private router: Router,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedContrato = null;
    this.idContrato = null;
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

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.contratos ? this.first === (this.contratos.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.contratos ? this.first === 0 : true;
  }

  /**
   * Se selecciona un estado para el contrato.
   */
  onSelectEstadoContrado(): void {
    this.selectedEstado = '';
    this.selectedEstado = 'estadoContrato=' + this.estadoContrato;
  }

  filtrarContrato(): void {
    this.info = false;
    this.infoMessage = '';
    if (this.estadoContrato === 'Filtrar por Estado Contrato' &&  (this.idContrato === null || this.idContrato.toString() === '')) {
      this.getAllContratos();
    } else {
      let filtros = '';
      if (this.selectedEstado !==  '' ) {
        if (filtros === '') {
          filtros = this.selectedEstado;
        } else {
          filtros = filtros  + '&' + this.selectedEstado;
        }
      }
      if (this.idContrato !== null ) {
        if (filtros === '' ) {
          filtros = 'id=' + this.idContrato;
        } else {
          filtros = filtros  + '&id=' + this.idContrato;
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
        if (this.total === 0) {
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
   * Cuando se presiona el botón Edit.
   */
  editContrato() {
    this.router.navigate(['home/contratos/editar-contrato/' + this.selectedContrato.id]);
  }

  exportToExcel() {
    // @ts-ignore
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.contratos);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "contratos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // @ts-ignore
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
