import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {Router} from "@angular/router";
import {RepuestoService} from "../../../../service/repuesto.service";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../../domain/modelo-equipo";
import {ModeloEquipoService} from "../../../../service/modelo-equipo.service";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {EstadoContrato} from "../../../../domain/contrato";

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
  estadoRepeusto: string;

  constructor(private router: Router,
              private repuestoService: RepuestoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService) {
  }

  ngOnInit() {
    this.error = false;
    this.repuestoSeleccionado = null;
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

  /**
   * Se selecciona un estado de la lista
   * @param value
   */
  onSelectedEstadoEquipo(value: string): void {
    this.estadoEquipo = value;
  }

  filtrarRepuesto(): void {
    this.info = false;
    this.infoMessage = "";
    if (this.tipoId === 'Filtrar por Tipo' && this.modeloId === 'Filtrar por Marca/Modelo'){
      this.getAllRepuestos();
    } else {
      //TODO: ver como enviar los datos para el filtro
      // this.getAllRepuestosFiltrados(repuesto);
    }
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
