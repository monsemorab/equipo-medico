import {Component, OnInit} from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {Ubicacion} from "../../../domain/ubicacion";
import {EquipoService} from "../../../service/equipo.service";
import {RepresentanteService} from "../../../service/representante.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-equipo',
  templateUrl: './add-equipo.component.html',
  styleUrls: ['./add-equipo.component.css']
})
export class AddEquipoComponent implements OnInit {

  // Datos Equipo
  equipo: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;
  numeroLote: string;
  estado: string;
  versionSw: string;
  descripcionEquipo: string;
  costo: number;
  licitacionCompra: string;
  fechaFabricacion: any;
  fechaVenGarantia: any;
  fechaInstalacion: any;
  fechaCompra: any;


  // modal para agregar/editar representante
  modalAddEditRepreOpen = false;
  repreSeleccionado: Representante;
  isEditRepre: boolean;
  representantes = new Array<Representante>();

  // modal para agregar/editar tipoEquipo
  modalAddEditTipoOpen = false;
  tipoSeleccionado: TipoEquipo;
  isEditTipo: boolean;
  tipos = new Array<TipoEquipo>();

  // modal para agregar/editar modelo
  modalAddEditModeloOpen = false;
  modeloSeleccionado: ModeloEquipo;
  isEditModelo: boolean;
  modelos = new Array<ModeloEquipo>();

  // modal para agregar/editar ubicaciones
  modalAddEditUbiOpen = false;
  ubicacionSeleccionada: Ubicacion;
  isEditUbicacion: boolean;
  ubicaciones = new Array<Ubicacion>();


  // error
  errorMessage: string;
  error: boolean;


  constructor(private router: Router,
              private equipoService: EquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.isEditRepre = false;
    this.isEditTipo = false;
    this.isEditModelo = false;
    this.isEditUbicacion = false;
    this.getAllRepresentantes();
    this.getAllTipos();
    this.getAllModelos();
    this.getAllUbicaciones();
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(): void {
    this.equipoService.getAllTipoEquipos().subscribe(
      tipos => {
        this.tipos = tipos;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de modelos para los equipos.
   */
  getAllModelos(): void {
    this.equipoService.getAllModelosEquipos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de representantes.
   */
  getAllRepresentantes(): void {
    this.representanteService.getAllRepresentantes().subscribe(
      representantes => {
        this.representantes = representantes;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de ubicaciones de los equipos.
   */
  getAllUbicaciones(): void {
    this.equipoService.getAllUbicaciones().subscribe(
      ubicaciones => {
        this.ubicaciones = ubicaciones;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Cuando se presiona el botón para crear un nuevo tipo de equipo.
   */
  addNewTipoEquipo(): void {
    this.tipoSeleccionado = null;
    this.modalAddEditTipoOpen = true;
  }

  /**
   * Cuando se selecciona un tipo para editar sus datos.
   */
  editTipoEquipo(): void {
    this.removeTipoEquipo();
    this.modalAddEditTipoOpen = true;
  }

  /**
   * Se quita de la lista de quipos existentes, el tipo de equipo que se quiere  editar.
   */
  removeTipoEquipo(): void {
    for (let i = 0; i < this.tipos.length; i++) {
      if (this.tipoSeleccionado.id === this.tipos[i].id) {
        this.tipos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * El tipo creado o editado es agregado a la lista de tipos de equipo.
   */
  addEditTipoEquipo(value: TipoEquipo) {
    this.tipos.push(value);
    this.tipoSeleccionado = value;
    this.isEditTipo = true;
    this.modalAddEditTipoOpen = false;
  }

  /**
   * Cuando se cancela la edición de un tipo de equipo, se vuelve a
   * agregar el tipo de equipo que se eliminó de la lista.
   */
  onCancelAddEditTipoEquipo(value: TipoEquipo) {
    this.tipos = [];
    if (this.isEditTipo) {
      this.equipoService.getAllTipoEquipos().subscribe(
        tipos => {
          this.tipos = tipos;
          this.tipos.push(value);
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
    this.modalAddEditTipoOpen = false;
  }

  /**
   * Cuando se presiona el botón para crear un nuevo modelo de equipo.
   */
  addNewModeloEquipo(): void {
    this.modeloSeleccionado = null;
    this.modalAddEditModeloOpen = true;
  }

  /**
   * Cuando se selecciona un modelo para editar sus datos.
   */
  editModeloEquipo(): void {
    this.removeModeloEquipo();
    this.modalAddEditModeloOpen = true;
  }

  /**
   * Se quita de la lista de modelos existentes, el modelo de equipo que se quiere  editar.
   */
  removeModeloEquipo(): void {
    for (let i = 0; i < this.modelos.length; i++) {
      if (this.modeloSeleccionado.id === this.modelos[i].id) {
        this.modelos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * El modelo creado o editado es agregado a la lista de modelos de equipo.
   */
  addEditModeloEquipo(value: ModeloEquipo) {
    this.modelos.push(value);
    this.modeloSeleccionado = value;
    this.isEditModelo = true;
    this.modalAddEditModeloOpen = false;
  }

  /**
   * Cuando se cancela la edición de un modelo de equipo, se vuelve a
   * agregar el modelo de equipo que se eliminó de la lista.
   */
  onCancelAddEditModeloEquipo(value: ModeloEquipo) {
    this.modelos = [];
    if (this.isEditModelo) {
      this.equipoService.getAllModelosEquipos().subscribe(
        modelos => {
          this.modelos = modelos;
          this.modelos.push(value);
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
    this.modalAddEditModeloOpen = false;
  }

  /**
   * Cuando se quiere crear un nuevo representante.
   */
  addNewRepresentante(): void {
    this.repreSeleccionado = null;
    this.modalAddEditRepreOpen = true;
  }

  /**
   * Cuando se selecciona un representante para editar sus datos.
   */
  editRepresentante() {
    this.removeRepresentante();
    this.modalAddEditRepreOpen = true;
  }

  /**
   * El representante seleccionado para su edición, se elimina temporalmente de la lista de representantes.
   */
  removeRepresentante() {
    for (let i = 0; i < this.representantes.length; i++) {
      if (this.repreSeleccionado === this.representantes[i]) {
        this.representantes.splice(i, 1);
      }
    }
  }


  /**
   * El representante creado o editado es agregado a la lista de representantes.
   */
  addEditRepresentante(value: Representante) {
    this.representantes.push(value);
    this.repreSeleccionado = value;
    this.isEditRepre = true;
    this.modalAddEditRepreOpen = false;
  }


  /**
   * Cuando se cancela la edición de un representante, el representante seleccionado se agrega de nuevo a la lista de
   * representantes.
   */
  onCancelAddEditRepresentante(value: Representante) {
    this.representantes = [];
    if (this.isEditRepre) {
      this.representanteService.getAllRepresentantes().subscribe(
        representantes => {
          this.representantes = representantes;
          this.representantes.push(value);
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
    this.modalAddEditRepreOpen = false;
  }


  /**
   * Cuando se quiere crear un nueva ubicación.
   */
  addNewUbicacionEquipo(): void {
    this.repreSeleccionado = null;
    this.modalAddEditUbiOpen = true;
  }

  /**
   * Cuando se selecciona una ubicación para editar sus datos.
   */
  editUbicacionEquipo() {
    this.removeUbicacion();
    this.modalAddEditUbiOpen = true;
  }

  /**
   * La ubicación seleccionada para su edición, se elimina temporalmente de la lista de ubicaciones.
   */
  removeUbicacion() {
    for (let i = 0; i < this.ubicaciones.length; i++) {
      if (this.ubicacionSeleccionada === this.ubicaciones[i]) {
        this.ubicaciones.splice(i, 1);
      }
    }
  }


  /**
   * La ubicación creada o editada es agregada a la lista de ubicaciones.
   */
  addEditUbicaion(value: Ubicacion) {
    this.ubicaciones.push(value);
    this.ubicacionSeleccionada = value;
    this.isEditUbicacion = false;
    this.modalAddEditUbiOpen = false;
  }

  /**
   * Cuando se cancela la edición de una ubicación, la ubicación seleccionada se agrega de nuevo a la lista de
   * ubicaciones.
   */
  onCancelAddEditUbicacion(value: Ubicacion) {
    this.ubicaciones = [];
    if (this.isEditRepre) {
      this.equipoService.getAllUbicaciones().subscribe(
        ubicaciones => {
          this.ubicaciones = ubicaciones;
          this.ubicaciones.push(value);
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
    this.modalAddEditUbiOpen = false;
  }

  /**
   * Se selecciona un estado de la lista
   * @param value
   */
  onSelectedEstado(value: string): void {
    this.estado = value;
  }

  /**
   * Se selecciona un tipo de equipo.
   * @param value
   */
  onSelectedTipoEquipo(value: any): void {
    for (let i = 0; i < this.tipos.length; i++) {
      if (+value === this.tipos[i].id) {
        this.tipoSeleccionado = this.tipos[i];
        this.isEditTipo = true;
        break;
      }
    }
  }

  /**
   * Se selecciona un modelo para el equipo.
   * @param value
   */
  onSelectedModeloEquipo(value: any): void {
    for (let i = 0; i < this.modelos.length; i++) {
      if (+value === this.modelos[i].id) {
        this.modeloSeleccionado = this.modelos[i];
        this.isEditModelo = true;
        break;
      }
    }
  }

  /**
   * Se selecciona un representante de la lista.
   * @param value
   */
  onSelectedRepresentante(value: any): void {
    for (let i = 0; i < this.representantes.length; i++) {
      if (+value === this.representantes[i].id) {
        this.repreSeleccionado = this.representantes[i];
        this.isEditRepre = true;
        break;
      }
    }
  }

  /**
   * Se selecciona una ubicación para el equipo.
   * @param value
   */
  onSelectedUbicacionEquipo(value: any): void {
    for (let i = 0; i < this.ubicaciones.length; i++) {
      if (+value === this.ubicaciones[i].id) {
        this.ubicacionSeleccionada = this.ubicaciones[i];
        this.isEditUbicacion = true;
        break;
      }
    }
  }

  /**
   * Se guarda la información del equipo creado.
   */
  onSaveEquipo(): void {
    this.equipo = new Equipo(null, this.numeroSerie, this.numeroPatrimonial, this.numeroLote, this.estado,
      this.versionSw, this.descripcionEquipo, this.costo, this.repreSeleccionado, this.tipoSeleccionado,
      this.modeloSeleccionado, this.ubicacionSeleccionada, this.licitacionCompra, this.fechaFabricacion,
      this.fechaVenGarantia, this.fechaInstalacion, this.fechaCompra);
    this.saveEquipo(this.equipo);
  }

  /**
   * Se crea un nuevo equipo.
   * @param equipo
   */
  saveEquipo(equipo: Equipo): void {
    this.equipoService.crearEquipo(equipo).subscribe(
      equipo => {
        this.equipo = equipo;
        this.goBack();
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/equipos/lista-equipo']);
  }

}

