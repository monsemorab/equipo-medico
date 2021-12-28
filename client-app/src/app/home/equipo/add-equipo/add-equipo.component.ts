import {Component, OnInit} from '@angular/core';
import {Equipo} from '../../../domain/equipo';
import {Representante} from '../../../domain/representante';
import {TipoEquipo} from '../../../domain/tipo-equipo';
import {Modelo} from '../../../domain/modelo';
import {Ubicacion} from '../../../domain/ubicacion';
import {EquipoService} from '../../../service/equipo.service';
import {RepresentanteService} from '../../../service/representante.service';
import {Router} from '@angular/router';
import {ModeloService} from '../../../service/modelo.service';
import {TipoEquipoService} from '../../../service/tipo-equipo.service';
import {UbicacionEquipoService} from '../../../service/ubicacion-equipo.service';
import {Marca} from '../../../domain/marca';
import {MarcaService} from '../../../service/marca.service';

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

  // Datos Modelo Equipo
  modelos = new Array<Modelo>();
  modeloSeleccionado: Modelo;
  modeloId: any;
  modelo: string;
  // Datos Marca Equipo
  marcas = new Array<Marca>();
  marcaSeleccionada: Marca;
  marcaId: any;
  marca: string;
  marcaFueSeleccionada = false;
  modeloFueSeleccionado = false;


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
              private modeloService: ModeloService,
              private marcaService: MarcaService,
              private tipoEquipoService: TipoEquipoService,
              private ubicacionEquipoService: UbicacionEquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.isEditRepre = false;
    this.isEditTipo = false;
    this.isEditUbicacion = false;
    this.tipoId = 'Agregar Tipo';
    this.modeloId = 'Seleccionar Modelo';
    this.marcaId = 'Seleccionar Marca';
    this.repreId = 'Agregar Representante';
    this.ubicacionId = 'Agregar Ubicación';
    this.modelo = '';
    this.marca = '';
    this.getAllMarcas();
    this.getAllRepresentantes(null);
    this.getAllTipos(null);
    this.getAllUbicaciones(null);
    this.estado = 'Operativo';
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(tipo: TipoEquipo): void {
    this.tipoEquipoService.getAllTipoEquipos().subscribe(
      tipos => {
        this.tipos = tipos;
        if (tipo != null) {
          this.tipoId = tipo.id;
          this.tipoSeleccionado = tipo;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
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
        this.modelos = modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
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
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }


  /**
   * Se obtiene la lista de representantes.
   */
  getAllRepresentantes(repre: Representante): void {
    this.representanteService.getAllRepresentantes().subscribe(
      representantes => {
        this.representantes = representantes;
        if (repre != null) {
          this.repreId = repre.id;
          this.repreSeleccionado = repre;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de ubicaciones de los equipos.
   */
  getAllUbicaciones(ubicacion: Ubicacion): void {
    this.ubicacionEquipoService.getAllUbicaciones().subscribe(
      ubicaciones => {
        this.ubicaciones = ubicaciones;
        if (ubicacion != null) {
          this.ubicacionId = ubicacion.id;
          this.ubicacionSeleccionada = ubicacion;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
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
    this.getAllTipos(value);
    this.modalAddEditTipoOpen = false;
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
    this.getAllRepresentantes(value);
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
    this.getAllUbicaciones(value);
    this.modalAddEditUbiOpen = false;
  }


  /**
   * Al seleccionar un tipo de la lista
   */
  onSelectTipo() {
    this.tipoEquipoService.getTipoEquipoById(this.tipoId).subscribe(
      tipo => {
        this.tipoSeleccionado = tipo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar un modelo de la lista
   */
  onSelectModelo() {
    if (this.modeloId === 'Seleccionar Modelo') {
      this.modeloFueSeleccionado = false;
    } else {
      this.modeloService.getModeloEquipoById(this.modeloId).subscribe(
        modelo => {
          this.modeloSeleccionado = modelo;
          this.modeloFueSeleccionado = true;
        },
        error => {
          this.errorMessage = error.error;
          this.modeloFueSeleccionado = false;
          console.log(this.errorMessage);
          this.error = true;
        }
      );
    }
  }

  /**
   * Al seleccionar una marca de la lista
   */
  onSelectMarca() {
    if (this.marcaId === 'Seleccionar Marca') {
      this.modelos = [];
      this.modeloId = 'Seleccionar Modelo';
      this.marcaFueSeleccionada = false;
      this.modeloFueSeleccionado = false;
    } else {
      this.marcaService.getMarcaEquipoById(this.marcaId).subscribe(
        marca => {
          this.marcaSeleccionada = marca;
          this.marcaFueSeleccionada = true;
          this.getAllModelosByMarca(this.marcaSeleccionada.id);
        },
        error => {
          this.errorMessage = error.error;
          this.marcaFueSeleccionada = false;
          console.log(this.errorMessage);
          this.error = true;
        }
      );
    }
  }

  /**
   * Al seleccionar un representante de la lista
   */
  onSelectRepresentante() {
    this.representanteService.getRepresentanteById(this.repreId).subscribe(
      representante => {
        this.repreSeleccionado = representante;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar una ubicacion existente de la lista
   */
  onSelectUbicacion() {
    this.ubicacionEquipoService.getUbicacionById(this.ubicacionId).subscribe(
      ubicacion => {
        this.ubicacionSeleccionada = ubicacion;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  /**
   * Se guarda la información del equipo creado.
   */
  onSaveEquipo(): void {
    if (typeof this.fechaVenGarantia === 'string' || this.fechaVenGarantia instanceof String) {
      const parts = this.fechaVenGarantia.split('-');
      this.fechaVenGarantia = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }

    if (typeof this.fechaInstalacion === 'string' || this.fechaInstalacion instanceof String) {
      const parts = this.fechaInstalacion.split('-');
      this.fechaInstalacion = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }

    if (typeof this.fechaCompra === 'string' || this.fechaCompra instanceof String) {
      const parts = this.fechaCompra.split('-');
      this.fechaCompra = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }

    // se verifica si la marca ingresada ya existe, si no, se crea una nueva entrada en la BD
    if (this.marca !== '') {
      this.marcaSeleccionada = this.getMarcaByName(this.marca);
    }

    if (this.marcaSeleccionada.id == null) {
      this.crearMarca();
    } else {
      if (this.modelo !== ' ') {
        this.modeloSeleccionado = new Modelo(null, this.modelo, this.marcaSeleccionada);
        this.crearModelo();
      } else {
        this.crearYGuardarDatosEquipo();
      }
    }
  }

  /**
   * Se crean el equipo con los datos creados e ingresados
   */
  crearYGuardarDatosEquipo() {
    this.equipo = new Equipo(null, this.numeroSerie, this.numeroPatrimonial, this.numeroLote, this.estado,
      this.versionSw, this.descripcionEquipo, this.costo, this.repreSeleccionado, this.tipoSeleccionado,
      this.modeloSeleccionado, this.marcaSeleccionada, this.ubicacionSeleccionada, this.licitacionCompra, null,
      this.fechaFabricacion, this.fechaVenGarantia, this.fechaInstalacion, this.fechaCompra);
    this.saveEquipo(this.equipo);
  }

  /**
   * Se crea una nueva marca con los datos ingresados
   */
  crearMarca(): void {
    this.marcaService.crearMarcaEquipo(this.marcaSeleccionada).subscribe(
      marca => {
        this.marcaSeleccionada = marca;
        // se crea una nueva entrada en la BD
        this.modeloSeleccionado = new Modelo(null, this.modelo, this.marcaSeleccionada);
        this.crearModelo();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Se crea un nuevo modelo para el equipo creado
   */
  crearModelo(): void {
    this.modeloService.crearModeloEquipo(this.modeloSeleccionado).subscribe(
      modelo => {
        this.modeloSeleccionado = modelo;
        this.crearYGuardarDatosEquipo();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
      }
    );
  }

  /**
   * Verificamos si la marca ingresada existe en la BD, si no es el caso, se devuelve una nueva instancia
   * @param marcaIngresada
   */
  getMarcaByName(marcaIngresada: string): Marca {
    for (let i = 0; i < this.marcas.length; i++) {
      if (marcaIngresada === this.marcas[i].marca) {
        this.getAllModelosByMarca(this.marcas[i].id);
        return this.marcas[i];
      }
    }
    return new Marca(null, this.marca);
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
        this.cambioEstadoEquipo(this.equipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  cambioEstadoEquipo(equipo: Equipo): void {
    this.equipoService.cambioEstadoEquipo(equipo).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      equipo => {
        this.equipo = equipo;
        this.equipoService.emitExisteListaEquipos(true);
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/equipos/lista-equipo']);
  }

}
