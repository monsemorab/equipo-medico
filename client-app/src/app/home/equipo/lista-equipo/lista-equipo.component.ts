import {Component, OnInit} from '@angular/core';
import {EquipoService} from '../../../service/equipo.service';
import {Equipo} from '../../../domain/equipo';
import {Router} from '@angular/router';
import {ModeloEquipoService} from '../../../service/modelo-equipo.service';
import {TipoEquipoService} from '../../../service/tipo-equipo.service';
import {TipoEquipo} from '../../../domain/tipo-equipo';
import {ModeloEquipo} from '../../../domain/modelo-equipo';
import {Ubicacion} from '../../../domain/ubicacion';
import {UbicacionEquipoService} from '../../../service/ubicacion-equipo.service';
import {ContratoService} from '../../../service/contrato.service';
import {EstadoContrato} from '../../../domain/contrato';

@Component({
  selector: 'app-lista-equipo',
  templateUrl: './lista-equipo.component.html',
  styleUrls: ['./lista-equipo.component.css']
})
export class ListaEquipoComponent implements OnInit {

  // equipo
  selectedEquipo: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  equipos: Equipo[];

  // filtro
  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();
  ubicaciones = new Array<Ubicacion>();
  estadosContrato: EstadoContrato[];
  tipoId: any;
  modeloId: any;
  ubicacionId: any;
  estadoEquipo: string;
  estadoContrato: string;
  selectedTipo: string;
  selectedModeloMarca: string;
  selectedUbi: string;
  selectedEstadoEquipo: string;
  selectedEstadoContrato: string;

  constructor(private router: Router,
              private equipoService: EquipoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private ubicacionEquipoService: UbicacionEquipoService,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedEquipo = null;
    this.numeroSerie = '';
    this.numeroPatrimonial = '';
    this.selectedTipo = '';
    this.selectedModeloMarca = '';
    this.selectedUbi = '';
    this.selectedEstadoEquipo = '';
    this.selectedEstadoContrato = '';
    this.getAllEquipos();
    this.getAllTipos();
    this.getAllModelos();
    this.getAllUbicaciones();
    this.getEstadoContratos();
    this.tipoId = 'Filtrar por Tipo';
    this.modeloId = 'Filtrar por Marca/Modelo';
    this.ubicacionId = 'Filtrar por Ubicacion';
    this.estadoEquipo = 'Filtrar por Estado Equipo';
    this.estadoContrato = 'Filtrar por Estado Contrato';
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
        console.log(this.errorMessage);
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
        console.log(this.errorMessage);
        // this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de ubicaciones de los equipos.
   */
  getAllUbicaciones(): void {
    this.ubicacionEquipoService.getAllUbicaciones().subscribe(
      ubicaciones => {
        this.ubicaciones = ubicaciones;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
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
   * Se obtiene la lista de todos los equipos.
   */
  getAllEquipos(): void {
    this.equipoService.getAllEquipos().subscribe(
      list => {
        this.equipos = list;
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.equipos = [];
        this.loading = false;
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

  onSelectedUbicacion(value: string): void {
    this.ubicacionId = value;
    this.selectedUbi = '';
    for (let i = 0; i < this.ubicaciones.length; i++) {
      if (this.ubicaciones[i].id == this.ubicacionId) {
        this.selectedUbi = 'servicio=' + this.ubicaciones[i].servicio;
        break;
      }
    }
  }


  /**
   * Se selecciona un estado de la lista
   * @param value
   */
  onSelectedEstado(value: string): void {
    this.estadoEquipo = value;
    this.selectedEstadoEquipo = '';
    this.selectedEstadoEquipo = 'estadoEquipo=' + value;
  }

  /**
   * Se selecciona un estado para el contrato.
   * @param value
   */
  onSelectedEstadoContrado(value: string): void {
    this.estadoContrato = value;
    this.selectedEstadoContrato = '';
    this.selectedEstadoContrato = 'estadoContrato=' + value;
  }

  /**
   * se filtra la lista de equipos por los datos seleccionados
   */
  filtrarEquipo(): void {
    this.info = false;
    this.infoMessage = '';
    if (this.tipoId == 'Filtrar por Tipo' && this.modeloId == 'Filtrar por Marca/Modelo' &&
      this.ubicacionId == 'Filtrar por Ubicacion' && this.estadoEquipo == 'Filtrar por Estado Equipo' &&
      this.estadoContrato == 'Filtrar por Estado Contrato') {
      this.getAllEquipos();
    } else {
      let filtros = '';
      if (this.selectedEstadoEquipo !== '' ) {
        if (filtros == '' ) {
          filtros = this.selectedEstadoEquipo;
        } else {
          filtros = filtros  + '&' + this.selectedEstadoEquipo;
        }
      }
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
      if (this.selectedUbi !== '' ) {
        if (filtros == '' ) {
          filtros = this.selectedUbi;
        } else {
          filtros = filtros  + '&' + this.selectedUbi;
        }
      }

      if (this.selectedEstadoContrato !==  '' ) {
        if (filtros == '') {
          filtros = this.selectedEstadoContrato;
        } else {
          filtros = filtros  + '&' + this.selectedEstadoContrato;
        }
      }
      this.getAllEquiposFiltrados(filtros);
    }
  }

  /**
   * Se obtiene la lista de equipos filtrada
   * @param filtro
   */
  getAllEquiposFiltrados(filtro: string): void {
    this.equipoService.getEquiposFiltrados(filtro).subscribe(
      list => {
        this.equipos = list;
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
        this.equipos = [];
        this.loading = false;
      }
    );
  }

  /**
   * Cuando se presiona el botón Add.
   */
  addEquipo() {
    this.router.navigate(['home/equipos/crear-equipo']);
  }

  /**
   * Cuando se selecciona un Equipo de la lista.
   * @param {Equipo} equipo
   */
  selectEquipo(equipo: Equipo): void {
    if (this.selectedEquipo != null && this.selectedEquipo.id == equipo.id) {
      this.selectedEquipo = null;
    } else {
      this.selectedEquipo = equipo;
    }
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editEquipo() {
    this.router.navigate(['home/equipos/editar-equipo/' + this.selectedEquipo.id]);

  }

}
