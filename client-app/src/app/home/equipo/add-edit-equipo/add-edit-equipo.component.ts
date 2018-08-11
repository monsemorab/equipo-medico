import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {EquipoService} from "../../../service/equipo.service";
import {Ubicacion} from "../../../domain/ubicacion";

@Component({
  selector: 'app-add-edit-equipo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-edit-equipo.component.html',
  styleUrls: ['./add-edit-equipo.component.css']
})
export class AddEditEquipoComponent implements OnInit {

  @Input() equipo: Equipo;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // form
  buttonTitleRepre: string;
  buttonTitleTipo: string;
  buttonTitleModelo: string;
  buttonTitleUbicacion: string;

  // modal representante
  modalRepreOpen = false;
  modalRepreTitle: string;
  representante = new Representante(null, '', '', '', '', '', '');

  // modal tipo equipo
  modalTipoOpen = false;
  modalTipoTitle: string;
  tipoEquipo = new TipoEquipo(null, '', '', '', '', '');

  // modal modelo equipo
  modalModeloOpen = false;
  modalModeloTitle: string;
  modeloEquipo = new ModeloEquipo(null, '', '', '');

  // modal ubicación equipo
  modalUbicacionOpen = false;
  modalUbicacionTitle: string;
  ubicacion = new Ubicacion(null, '', '', '', '');

  // equipo
  tipos: TipoEquipo[];
  selectedTipo: TipoEquipo;
  tipoEquipoNombre: string;
  modelos: ModeloEquipo[];
  selectedModelo: ModeloEquipo;
  modeloEquipoNombre: string;
  ubicaciones: Ubicacion[];
  selectedUbicacion: Ubicacion;
  ubicacionEquipoNombre: string;


  // error
  errorMessage: string;
  error: boolean;

  constructor(private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.tipoEquipoNombre = 'Agregar Tipo';
    this.modeloEquipoNombre = 'Agregar Modelo';
    this.ubicacionEquipoNombre = 'Agregar Ubicación';
    this.buttonTitleRepre = 'Add';
    this.buttonTitleTipo = 'Add';
    this.buttonTitleModelo = 'Add';
    this.buttonTitleUbicacion = 'Add';
    this.getAllTipos();
    this.getAllModelos();
    this.getAllUbicaciones();
  }


  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(): void {
    this.equipoService.getTipoEquipos().subscribe(
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
    this.equipoService.getModeloEquipos().subscribe(
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
   * TODO: falta este método
   * Se obtiene la lista de ubicaciones de los equipos.
   */
  getAllUbicaciones(): void {
    // this.equipoService.getAllUbicaciones().subscribe(
    //   ubicaciones => {
    //     this.ubicaciones = ubicaciones;
    //   },
    //   error => {
    // this.errorMessage = error;
    // this.error = true;
    //   }
    // );
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos de un representante.
   */
  addRepresentante(): void {
    this.modalRepreTitle = 'Agregar Representante';
    if (this.isEdit) {
      this.representante = this.equipo.representante;
      this.modalRepreTitle = 'Editar Representante';
    }
    this.modalRepreOpen = true;
  }

  /**
   * Cuando se agrega los datos de un representante.
   */
  onAddRepresentante(): void {
    this.equipo.representante = this.representante;
    this.buttonTitleRepre = 'Edit';
    this.modalRepreOpen = false
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos del tipo de equipo.
   */
  addTipoEquipo(): void {
    this.modalTipoTitle = 'Agregar Tipo de Equipo';
    if (this.isEdit) {
      this.tipoEquipo = this.equipo.tipoEquipo;
      this.modalTipoTitle = 'Editar Tipo de Equipo';
    }
    this.modalTipoOpen = true;
  }

  /**
   * Cuando se agregan los datos del tipo de quipo.
   */
  onAddTipoEquipo(): void {
    this.equipo.tipoEquipo = this.tipoEquipo;
    this.buttonTitleTipo = 'Edit';
    this.modalTipoOpen = false
  }

  onSelectedEstado(value: string): void {
    this.equipo.estado = value;
  }

  /**
   * Se selecciona un tipo de equipo.
   * @param {number} value
   */
  onSelectedTipoEquipo(value: number): void {
    this.getTipoEquipoById(value);
  }

  /**
   * Se obtiene el tipo de equipo seleccionado.
   * @param {number} id
   */
  getTipoEquipoById(id: number): void {
    this.equipoService.getTipoEquipoById(id).subscribe(
      tipo => {
        this.selectedTipo = tipo;
        this.equipo.tipoEquipo = this.selectedTipo;
      },
      error => {
        this.errorMessage = error,
          this.selectedTipo = null;
      }
    );
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos del modelo del equipo.
   */
  addModeloEquipo(): void {
    this.modalModeloTitle = 'Agregar Modelo del Equipo';
    if (this.isEdit) {
      this.modeloEquipo = this.equipo.modeloEquipo;
      this.modalModeloTitle = 'Editar Modelo del Equipo';
    }
    this.modalModeloOpen = true;
  }

  /**
   * Cuando se agregan los datos del modelo del quipo.
   */
  onAddModeloEquipo(): void {
    this.equipo.modeloEquipo = this.modeloEquipo;
    this.buttonTitleModelo = 'Edit';
    this.modalModeloOpen = false
  }

  /**
   * Se selecciona un modelo para el equipo.
   * @param {number} value
   */
  onSelectedModeloEquipo(value: number): void {
    this.getModeloEquipoById(value);
  }

  /**
   * Se obtiene el modelo seleccionado para el equipo.
   * @param {number} id
   */
  getModeloEquipoById(id: number): void {
    this.equipoService.getModeloEquipoById(id).subscribe(
      modelo => {
        this.selectedModelo = modelo;
        this.equipo.modeloEquipo = this.selectedModelo;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos de la ubicación de un equipo.
   */
  addUbicacionEquipo(): void {
    this.modalUbicacionTitle = 'Agregar Ubicación del Equipo';
    if (this.isEdit) {
      this.ubicacion = this.equipo.ubicacion;
      this.modalUbicacionTitle = 'Editar Ubicación del Equipo';
    }
    this.modalUbicacionOpen = true;
  }

  /**
   * Cuando se agregan los datos de la ubicación de un equipo.
   */
  onAddUbicacionEquipo(): void {
    this.equipo.ubicacion = this.ubicacion;
    this.buttonTitleUbicacion = 'Edit';
    this.modalUbicacionOpen = false
  }

  /**
   * Se selecciona una ubicación para el equipo.
   * @param {number} value
   */
  onSelectedUbicacionEquipo(value: number): void {
    this.getUbicacionEquipoById(value);
  }

  /**
   * TODO: falta este método
   * Se obtiene la ubicación seleccionada para el equipo.
   * @param {number} id
   */
  getUbicacionEquipoById(id: number): void {
    // this.equipoService.getUbicacionById(id).subscribe(
    //   ubicacion => {
    //     this.selectedUbicacion = ubicacion;
    //     this.equipo.ubicacion = this.selectedUbicacion;
    //   },
    //   error => {
    // this.errorMessage = error;
    // this.error = true;
    //   }
    // );
  }

  /**
   * Se guarda la información del equipo creado o editado.
   */
  onSaveEquipo(): void {
    console.log('onSaveEquipo() ', this.equipo);
    this.onCloseAddEditEquipo();
  }


  /**
   * Cuando la edición o la creación de un equipo se finaliza.
   */
  onCloseAddEditEquipo() {
    this.onFinished.emit(true);
  }

  /**
   * Cuando se cancela la edición o creación de un equipo.
   */
  onCancelAddEditEquipo() {
    this.onCanceled.emit(true);
  }

}
