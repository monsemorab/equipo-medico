import {Component, OnInit} from '@angular/core';
import {Equipo} from '../../../domain/equipo';
import {Representante} from '../../../domain/representante';
import {TipoEquipo} from '../../../domain/tipo-equipo';
import {ModeloEquipo} from '../../../domain/modelo-equipo';
import {Ubicacion} from '../../../domain/ubicacion';
import {EquipoService} from '../../../service/equipo.service';
import {RepresentanteService} from '../../../service/representante.service';
import {Router} from '@angular/router';
import {ModeloEquipoService} from '../../../service/modelo-equipo.service';
import {TipoEquipoService} from '../../../service/tipo-equipo.service';
import {UbicacionEquipoService} from '../../../service/ubicacion-equipo.service';

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
  repreId: any;
  repreSeleccionado: Representante;
  isEditRepre: boolean;
  representantes = new Array<Representante>();

  // modal para agregar/editar tipoEquipo
  modalAddEditTipoOpen = false;
  tipoId: any;
  tipoSeleccionado: TipoEquipo;
  isEditTipo: boolean;
  tipos = new Array<TipoEquipo>();

  // modal para agregar/editar modelo
  modalAddEditModeloOpen = false;
  modeloId: any;
  modeloSeleccionado: ModeloEquipo;
  isEditModelo: boolean;
  modelos = new Array<ModeloEquipo>();

  // modal para agregar/editar ubicaciones
  modalAddEditUbiOpen = false;
  ubicacionSeleccionada: Ubicacion;
  ubicacionId: any;
  isEditUbicacion: boolean;
  ubicaciones = new Array<Ubicacion>();

  // error
  errorMessage: string;
  error: boolean;

  constructor(private router: Router,
              private equipoService: EquipoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private ubicacionEquipoService: UbicacionEquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.isEditRepre = false;
    this.isEditTipo = false;
    this.isEditModelo = false;
    this.isEditUbicacion = false;
    this.tipoId = 'Agregar Tipo';
    this.modeloId = 'Agregar Modelo';
    this.repreId = 'Agregar Representante';
    this.ubicacionId = 'Agregar Ubicación';
    this.getAllRepresentantes();
    this.getAllTipos();
    this.getAllModelos();
    this.getAllUbicaciones();
    this.estado = "Operativo";
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
        this.error = true;
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
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
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
        console.log(this.errorMessage)
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
    this.isEditTipo = true;
    this.modalAddEditTipoOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeTipoEquipoModal(value: TipoEquipo) {
    if(value != null) {
      this.tipoId = value.id;
      this.tipoSeleccionado = value;
      this.getAllTipos();
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
    this.isEditModelo = true;
    this.modalAddEditModeloOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeModeloEquipoModal(value: ModeloEquipo) {
    if(value != null) {
      this.modeloId = value.id;
      this.modeloSeleccionado = value;
      this.getAllModelos();
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
    this.isEditRepre = true;
    this.modalAddEditRepreOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeRepresentanteModal(value: Representante) {
    if(value != null) {
      this.repreId = value.id;
      this.repreSeleccionado = value;
      this.getAllRepresentantes();
    }
    this.modalAddEditRepreOpen = false;
  }

  /**
   * Cuando se quiere crear un nueva ubicación.
   */
  addNewUbicacionEquipo(): void {
    this.ubicacionSeleccionada = null;
    this.modalAddEditUbiOpen = true;
  }

  /**
   * Cuando se selecciona una ubicación para editar sus datos.
   */
  editUbicacionEquipo() {
    this.isEditUbicacion = true;
    this.modalAddEditUbiOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeUbicaionEquipoModal(value: Ubicacion) {
    if(value != null) {
      this.ubicacionId = value.id;
      this.ubicacionSeleccionada = value;
      this.getAllUbicaciones();
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
   * Al seleccionar un tipo de la lista
   */
  onSelectedTipo() {
    this.tipoEquipoService.getTipoEquipoById(this.tipoId).subscribe(
      tipo => {
        this.tipoSeleccionado = tipo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar un modelo d ela lista
   */
  onSelectedModelo() {
    this.modeloEquipoService.getModeloEquipoById(this.modeloId).subscribe(
      modelo => {
        this.modeloSeleccionado = modelo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar un representante de la lista
   */
  onSelectedRepresentante() {
    this.representanteService.getRepresentanteById(this.repreId).subscribe(
      representante => {
        this.repreSeleccionado = representante;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar una ubicacion existente de la lista
   */
  onSelectedUbicacion() {
    this.ubicacionEquipoService.getUbicacionById(this.ubicacionId).subscribe(
      ubicacion => {
        this.ubicacionSeleccionada = ubicacion;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se guarda la información del equipo creado.
   */
  onSaveEquipo(): void {
    if (typeof this.fechaVenGarantia === 'string' || this.fechaVenGarantia instanceof String) {
      let parts = this.fechaVenGarantia.split('/');
      this.fechaVenGarantia = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    if (typeof this.fechaInstalacion === 'string' || this.fechaInstalacion instanceof String) {
      let parts = this.fechaInstalacion.split('/');
      this.fechaInstalacion = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    if (typeof this.fechaCompra === 'string' || this.fechaCompra instanceof String) {
      let parts = this.fechaCompra.split('/');
      this.fechaCompra = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    this.equipo = new Equipo(null, this.numeroSerie, this.numeroPatrimonial, this.numeroLote, this.estado,
      this.versionSw, this.descripcionEquipo, this.costo, this.repreSeleccionado, this.tipoSeleccionado,
      this.modeloSeleccionado, this.ubicacionSeleccionada, null, this.licitacionCompra, this.fechaFabricacion,
      this.fechaVenGarantia, this.fechaInstalacion, this.fechaCompra);
    this.saveEquipo(this.equipo);
  }

  /**
   * Se crea un nuevo equipo.
   * @param equipo
   */
  saveEquipo(equipo: Equipo): void {
    this.equipoService.crearEquipo(equipo).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      equipo => {
        this.equipo = equipo;
        this.equipoService.emitExisteListaEquipos(true);
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/equipos/lista-equipo']);
  }

}

