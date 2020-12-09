import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {Router} from "@angular/router";
import {RepuestoService} from "../../../../service/repuesto.service";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../../domain/modelo-equipo";
import {ModeloEquipoService} from "../../../../service/modelo-equipo.service";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";

@Component({
  selector: 'app-lista-repuestos',
  templateUrl: './lista-repuestos.component.html',
  styleUrls: ['./lista-repuestos.component.css']
})
export class ListaRepuestosComponent implements OnInit {

  // repuesto
  repuestoSeleccionado: Repuesto;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  repuestos = new Array<Repuesto>();

  // filtro
  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();
  tipoId: any;
  modeloId: any;
  estadoEquipo: string;
  selectedTipo: string;
  selectedModeloMarca: string;
  selectedEstadoEquipo: string;

  constructor(private router: Router,
              private repuestoService: RepuestoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService) {
  }

  ngOnInit() {
    this.error = false;
    this.repuestoSeleccionado = null;
    this.selectedTipo = '';
    this.selectedModeloMarca = '';
    this.selectedEstadoEquipo = '';
    this.tipoId = 'Filtrar por Tipo';
    this.modeloId = 'Filtrar por Marca/Modelo';
    this.getAllRepuestos();
    this.getAllTipos();
    this.getAllModelos();
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
   * Se obtiene la lista de modelos para los equipos.
   */
  getAllModelos(): void {
    this.modeloEquipoService.getAllModelosEquipos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        // this.error = true;
      }
    );
  }

  onSelectedTipo(value: string): void {
    this.tipoId = value;
    this.selectedTipo = '';
    for (let i = 0; i < this.tipos.length; i++) {
      if (this.tipos[i].id == this.tipoId) {
        this.selectedTipo = 'tipo=' + this.tipos[i].tipo;
        break;
      }
    }
  }

  onSelectedMarcaModelo(value: string): void {
    this.modeloId = value;
    this.selectedModeloMarca = '';
    for (let i = 0; i < this.modelos.length; i++) {
      if (this.modelos[i].id == this.modeloId) {
        this.selectedModeloMarca = 'marca=' + this.modelos[i].marca;
        this.selectedModeloMarca = this.selectedModeloMarca + '&modelo=' + this.modelos[i].modelo;
        break;
      }
    }
  }

  /**
   * Se selecciona un estado de la lista
   * @param value
   */
  onSelectedEstadoEquipo(value: string): void {
    this.estadoEquipo = value;
    this.selectedEstadoEquipo = '';
    this.selectedEstadoEquipo = 'estadoEquipo=' + value;
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
      if (this.selectedModeloMarca !== '') {
        if (filtros == '') {
          filtros = this.selectedModeloMarca;
        } else {
          filtros = filtros  + '&' + this.selectedModeloMarca;
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

  /**
   * Cuando se presiona el botón Add.
   */
  goNewRepuestoForm(): void {
    this.router.navigate(['home/mantenimiento/repuestos/crear-repuesto']);
  }

  /**
   * Cuando se selecciona un repeusto de la lista.
   * @param repuesto
   */
  selectRepuesto(repuesto: Repuesto): void {
    if (this.repuestoSeleccionado != null && this.repuestoSeleccionado.id == repuesto.id) {
      this.repuestoSeleccionado = null;
    } else {
      this.repuestoSeleccionado = repuesto;
    }
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editRepuesto() {
    this.router.navigate(['home/mantenimiento/repuestos/editar-repuesto/' + this.repuestoSeleccionado.id]);
  }

}
