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
import {DatePipe} from "@angular/common";

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
          equipo.tipoEquipo, equipo.modeloEquipo, equipo.ubicacion, equipo.contrato, equipo.licitacionCompra,
          equipo.fechaFabricacion, equipo.fechaVenGarantia, equipo.fechaInstalacion, equipo.fechaCompra);
        this.camposAEditar(this.equipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
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
   * Se establecen los campos a ser editados del equipo seleccionado.
   * @param equipo
   */
  camposAEditar(equipo: Equipo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.equipoId = equipo.id;
    this.numeroSerie = equipo.numeroSerie;
    this.numeroPatrimonial = equipo.numeroPatrimonial;
    this.numeroLote = equipo.numeroLote;
    this.estado = equipo.estado;
    this.versionSw = equipo.versionSw;
    this.descripcionEquipo = equipo.descripcionEquipo;
    this.costo = equipo.costo;
    this.fechaFabricacion = equipo.fechaFabricacion;
    this.fechaVenGarantia = datepipe.transform(equipo.fechaVenGarantia, 'dd-MM-yyyy');
    this.fechaInstalacion = datepipe.transform(equipo.fechaInstalacion, 'dd-MM-yyyy');
    this.fechaCompra  = datepipe.transform(equipo.fechaCompra, 'dd-MM-yyyy');
    this.tipoSeleccionado = equipo.tipoEquipo;
    this.tipoId = equipo.tipoEquipo.id;
    this.modeloSeleccionado = equipo.modeloEquipo;
    this.modeloId = equipo.modeloEquipo.id;
    this.repreSeleccionado = equipo.representante;
    this.repreId = equipo.representante.id;
    if (equipo.ubicacion != null) {
      this.ubicacionSeleccionada = equipo.ubicacion;
      this.ubicacionId = equipo.ubicacion.id;
    }
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
  closeUbicaionModal(value: Ubicacion) {
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
    this.equipo.estado = value;
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
   * Se guarda la información del equipo editado.
   */
  onSaveEquipo(): void {
    if (typeof this.fechaVenGarantia === 'string' || this.fechaVenGarantia instanceof String) {
      let parts = this.fechaVenGarantia.split('-');
      this.fechaVenGarantia = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    if (typeof this.fechaInstalacion === 'string' || this.fechaInstalacion instanceof String) {
      let parts = this.fechaInstalacion.split('-');
      this.fechaInstalacion = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    if (typeof this.fechaCompra === 'string' || this.fechaCompra instanceof String) {
      let parts = this.fechaCompra.split('-');
      this.fechaCompra = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    this.equipo = new Equipo(this.equipoId, this.numeroSerie, this.numeroPatrimonial, this.numeroLote, this.estado,
      this.versionSw, this.descripcionEquipo, this.costo, this.repreSeleccionado, this.tipoSeleccionado,
      this.modeloSeleccionado, this.ubicacionSeleccionada, null, this.licitacionCompra, this.fechaFabricacion,
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
