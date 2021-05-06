import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {Router} from "@angular/router";
import {RepuestoService} from "../../../../service/repuesto.service";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {ModeloService} from "../../../../service/modelo.service";
import {MarcaService} from "../../../../service/marca.service";
import {Modelo} from "../../../../domain/modelo";
import {Marca} from "../../../../domain/marca";
import {Equipo} from "../../../../domain/equipo";

@Component({
  selector: 'app-lista-repuestos',
  templateUrl: './lista-repuestos.component.html',
  styleUrls: ['./lista-repuestos.component.css']
})
export class ListaRepuestosComponent implements OnInit {

  // repuesto
  selectedRepuesto: Repuesto;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  first = 0;
  rows = 2;
  repuestos = new Array<Repuesto>();
  selected = new Array<Repuesto>();

  // filtro
  tipos = new Array<TipoEquipo>();
  modelos = new Array<Modelo>();
  marcas = new Array<Marca>();
  tipoId: any;
  modeloId: any;
  marcaId: any;
  estadoEquipo: string;
  selectedTipo: string;
  selectedMarca: string;
  selectedModelo: string;
  selectedEstadoEquipo: string;

  constructor(private router: Router,
              private repuestoService: RepuestoService,
              private modeloService: ModeloService,
              private marcaService: MarcaService,
              private tipoEquipoService: TipoEquipoService) {
  }

  ngOnInit() {
    this.error = false;
    this.selectedRepuesto = null;
    this.selectedTipo = '';
    this.selectedMarca = '';
    this.selectedModelo = '';
    this.selectedEstadoEquipo = '';
    this.tipoId = 'Filtrar por Tipo';
    this.marcaId = 'Filtrar por Marca';
    this.modeloId = 'Filtrar por Modelo';
    this.getAllRepuestos();
    this.getAllTipos();
    this.getAllModelos();
    this.getAllMarcas();
  }

  /**
   * Obtener todos los respuestos de la BD
   */
  getAllRepuestos(): void {
    this.repuestoService.getAllRepuestos().subscribe(
      list => {
        this.repuestos = list;
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.loading = false;
      }
    );
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(): void {
    this.tipoEquipoService.getAllTipoEquipos().subscribe(
      tipos => {
        this.tipos = tipos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        // this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de modelos existentes para los equipos.
   */
  getAllModelos(): void {
    this.modeloService.getAllModeloEquipo().subscribe(
      modelos => {
        this.modelos= modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de los modelos filtrados por la marca seleccionada.
   * @param marcaId
   */
  getAllModelosByMarca(marcaId): void {
    this.modeloService.getAllModeloByMarca(marcaId).subscribe(
      modelos => {
        this.modelos= modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se obtiene la lista de marcas existentes para los equipos.
   */
  getAllMarcas(): void {
    this.marcaService.getAllMarcaEquipo().subscribe(
      marcas => {
        this.marcas = marcas;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  onSelectTipo(): void {
    this.selectedTipo = '';
    for (let i = 0; i < this.tipos.length; i++) {
      if (this.tipos[i].id == this.tipoId) {
        this.selectedTipo = 'tipo=' + this.tipos[i].tipo;
        break;
      }
    }
  }

  /**
   * Se selecciona un estado de la lista
   */
  onSelectEstadoEquipo(): void {
    this.selectedEstadoEquipo = '';
    this.selectedEstadoEquipo = 'estadoEquipo=' + this.estadoEquipo;
  }

  /**
   * Al seleccionar una marca de la lista
   */
  onSelectMarca() {
    this.marcaService.getMarcaEquipoById(this.marcaId).subscribe(
      marca => {
        this.selectedMarca = 'marca=' + marca.marca;
        this.getAllModelosByMarca(marca.id);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar un modelo de la lista
   */
  onSelectModelo() {
    this.modeloService.getModeloEquipoById(this.modeloId).subscribe(
      modelo => {
        this.selectedModelo = this.selectedModelo + '&modelo=' + modelo.modelo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * se filtra la lista de repuestos por los datos ingresados
   */
  filtrarRepuesto(): void {
    this.info = false;
    this.infoMessage = '';
    if (this.tipoId == 'Filtrar por Tipo' && this.modeloId == 'Filtrar por Marca/Modelo' &&
     this.estadoEquipo == 'Filtrar por Estado Equipo' ) {
      this.getAllRepuestos();
    } else {
      let filtros = '';
      if (this.selectedTipo !== '' ) {
        if (filtros == '' ) {
          filtros = this.selectedTipo;
        } else {
          filtros = filtros  + '&' + this.selectedTipo;
        }
      }
      if (this.selectedMarca !== '') {
        if (filtros == '') {
          filtros = this.selectedMarca;
        } else {
          filtros = filtros  + '&' + this.selectedMarca;
        }
      }

      if (this.selectedModelo !== '') {
        if (filtros == '') {
          filtros = this.selectedModelo;
        } else {
          filtros = filtros  + '&' + this.selectedModelo;
        }
      }

      if (this.selectedEstadoEquipo !== '' ) {
        if (filtros == '' ) {
          filtros = this.selectedEstadoEquipo;
        } else {
          filtros = filtros  + '&' + this.selectedEstadoEquipo;
        }
      }
      this.getAllRepuestosFiltrados(filtros);
    }
  }

  /**
   * se obtiene la lista de respuestos filtrada
   * @param filtro
   */
  getAllRepuestosFiltrados(filtro: string): void {
    this.repuestoService.getRepuestosFiltrados(filtro).subscribe(
      list => {
        this.repuestos = list;
        this.total = list.length;
        this.loading = false;
        if (this.total == 0) {
          this.info = true;
          this.infoMessage = 'No se encontraron registros para esta busqueda.';
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.repuestos = [];
        this.loading = false;
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
    return this.repuestos ? this.first === (this.repuestos.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.repuestos ? this.first === 0 : true;
  }

  /**
   * Cuando se presiona el botón Add.
   */
  goNewRepuestoForm(): void {
    this.router.navigate(['home/mantenimiento/repuestos/crear-repuesto']);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editRepuesto() {
    this.router.navigate(['home/mantenimiento/repuestos/editar-repuesto/' + this.selectedRepuesto.id]);
  }

  exportToExcel() {
    let j = -1;
    this.selected = [];
    if (this.first == this.rows || this.repuestos.length == 1) {
      j++;
      this.selected[j] = this.repuestos[this.first];
    } else {
      for (let i = this.first; i < this.rows; i++) {
        j++;
        this.selected[j] = this.repuestos[i];
      }
    }

    this.exportExcel();
  }

  exportExcel() {
    // @ts-ignore
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.selected);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "repuestos");
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
