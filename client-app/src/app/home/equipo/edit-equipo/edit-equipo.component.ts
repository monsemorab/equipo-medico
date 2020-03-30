import {Component, OnInit} from '@angular/core';
import {Equipo} from '../../../domain/equipo';
import {Representante} from '../../../domain/representante';
import {TipoEquipo} from '../../../domain/tipo-equipo';
import {ModeloEquipo} from '../../../domain/modelo-equipo';
import {Ubicacion} from '../../../domain/ubicacion';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EquipoService} from '../../../service/equipo.service';
import {RepresentanteService} from '../../../service/representante.service';
import {switchMap} from 'rxjs/operators';
import {ModeloEquipoService} from '../../../service/modelo-equipo.service';
import {TipoEquipoService} from '../../../service/tipo-equipo.service';
import {UbicacionEquipoService} from '../../../service/ubicacion-equipo.service';

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.css']
})
export class EditEquipoComponent implements OnInit {

  // Datos Equipo
  equipo: Equipo;
  equipoId: number;
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private ubicacionEquipoService: UbicacionEquipoService,
              private equipoService: EquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.isEditUbicacion = false;

    this.getAllTipos();
    this.getAllModelos();
    this.getAllRepresentantes();
    this.getAllUbicaciones();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.equipoService.getEquipoById(+params.get('id')))
      ).subscribe(equipo => {
        this.equipo = new Equipo(equipo.id, equipo.numeroSerie, equipo.numeroPatrimonial, equipo.numeroLote,
          equipo.estado, equipo.versionSw, equipo.descripcionEquipo, equipo.costo, equipo.representante,
          equipo.tipoEquipo, equipo.modeloEquipo, equipo.ubicacion, equipo.licitacionCompra, equipo.fechaFabricacion,
          equipo.fechaVenGarantia, equipo.fechaInstalacion, equipo.fechaCompra);
        this.camposAEditar(this.equipo);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      });
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
        this.errorMessage = error;
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
    this.ubicacionEquipoService.getAllUbicaciones().subscribe(
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
   * Se establecen los campos a ser editados del equipo seleccionado.
   * @param equipo
   */
  camposAEditar(equipo: Equipo) {
    this.equipoId = equipo.id;
    this.numeroSerie = equipo.numeroSerie;
    this.numeroPatrimonial = equipo.numeroPatrimonial;
    this.numeroLote = equipo.numeroLote;
    this.estado = equipo.estado;
    this.versionSw = equipo.versionSw;
    this.descripcionEquipo = equipo.descripcionEquipo;
    this.costo = equipo.costo;
    this.licitacionCompra = equipo.licitacionCompra;
    this.fechaFabricacion = equipo.fechaFabricacion;
    this.fechaVenGarantia = equipo.fechaVenGarantia;
    this.fechaInstalacion = equipo.fechaInstalacion;
    this.fechaCompra = equipo.fechaCompra;
    this.tipoSeleccionado = equipo.tipoEquipo;
    this.modeloSeleccionado = equipo.modeloEquipo;
    this.repreSeleccionado = equipo.representante;
    if (equipo.ubicacion != null) {
      this.ubicacionSeleccionada = equipo.ubicacion;
      this.isEditUbicacion = true;
    }
  }

  /**
   * Se selecciona un estado de la lista
   * @param value
   */
  onSelectedEstado(value: string): void {
    this.equipo.estado = value;
  }

  /**
   * Se selecciona un tipo de equipo.
   * @param value
   */
  onSelectedTipoEquipo(value: any): void {
    this.getTipoEquipoById(value);
  }

  /**
   * Se obtiene el tipo seleccionado de la lista.
   * @param {number} id
   */
  getTipoEquipoById(id: number): void {
    this.tipoEquipoService.getTipoEquipoById(id).subscribe(
      tipo => {
        this.tipoSeleccionado = tipo;
        this.isEditTipo = true;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se selecciona un modelo para el equipo.
   * @param value
   */
  onSelectedModeloEquipo(value: any): void {
    this.getModeloEquipoById(value);
  }

  /**
   * Se obtiene el modelo seleccionado de la lista.
   * @param {number} id
   */
  getModeloEquipoById(id: number): void {
    this.modeloEquipoService.getModeloEquipoById(id).subscribe(
      modelo => {
        this.modeloSeleccionado = modelo;
        this.isEditModelo = true;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se selecciona un representante de la lista.
   * @param value
   */
  onSelectedRepresentante(value: any): void {
    this.getRepresentanteById(+value);
  }

  /**
   * Se obtiene el representante seleccionado de la lista.
   * @param {number} id
   */
  getRepresentanteById(id: number): void {
    this.representanteService.getRepresentanteById(id).subscribe(
      representante => {
        this.repreSeleccionado = representante;
        this.isEditRepre = true;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Se selecciona una ubicación para el equipo.
   * @param value
   */
  onSelectedUbicacionEquipo(value: any): void {
    this.getUbicacionById(value);
  }

  /**
   * Se obtiene la ubicación seleccionada de la lista.
   * @param {number} id
   */
  getUbicacionById(id: number): void {
    this.ubicacionEquipoService.getUbicacionById(id).subscribe(
      ubicacion => {
        this.ubicacionSeleccionada = ubicacion;
        this.isEditUbicacion = true;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Cuando se selecciona un tipo para editar sus datos.
   */
  editTipoEquipo(): void {
    this.modalAddEditRepreOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeTipoEquipoModal(value: TipoEquipo) {
    this.tipoSeleccionado = value;
    this.getAllTipos();
    this.modalAddEditTipoOpen = false;
  }

  /**
   * Cuando se selecciona un modelo para editar sus datos.
   */
  editModeloEquipo(): void {
    this.modalAddEditModeloOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeModeloEquipoModal(value: ModeloEquipo) {
    this.modeloSeleccionado = value;
    this.getAllTipos();
    this.modalAddEditModeloOpen = false;
  }

  /**
   * Cuando se selecciona un representante para editar sus datos.
   */
  editRepresentante() {
    this.modalAddEditRepreOpen = true;
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeRepresentanteModal(value: Representante) {
    this.repreSeleccionado = value;
    this.getAllRepresentantes();
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
    this.modalAddEditUbiOpen = true;
  }


  /**
   * Cuando el control es devuelto a la pantalla principal.
   */
  closeUbicaionModal(value: Ubicacion) {
    this.ubicacionSeleccionada = value;
    this.getAllUbicaciones();
    this.modalAddEditUbiOpen = false;
  }

  /**
   * Se guarda la información del equipo editado.
   */
  onSaveEquipo(): void {
    this.equipo = new Equipo(null, this.numeroSerie, this.numeroPatrimonial, this.numeroLote, this.estado,
      this.versionSw, this.descripcionEquipo, this.costo, this.repreSeleccionado, this.tipoSeleccionado,
      this.modeloSeleccionado, this.ubicacionSeleccionada, this.licitacionCompra, this.fechaFabricacion,
      this.fechaVenGarantia, this.fechaInstalacion, this.fechaCompra);
    this.saveEquipo(this.equipo);
  }

  /**
   * Se actualiza el equipo seleccionado.
   * @param equipo
   */
  saveEquipo(equipo: Equipo): void {
    this.equipoService.editarEquipo(equipo).subscribe(
      respuesta => {
        this.equipo = respuesta;
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
