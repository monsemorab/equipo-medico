import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {EquipoService} from "../../../service/equipo.service";
import {Ubicacion} from "../../../domain/ubicacion";
import {SubscriptionLike as ISubscription} from 'rxjs';
import {RepresentanteService} from "../../../service/representante.service";

@Component({
  selector: 'app-add-edit-equipo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-edit-equipo.component.html',
  styleUrls: ['./add-edit-equipo.component.css']
})
export class AddEditEquipoComponent implements OnInit, OnDestroy {

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
  isEditRepre = false;
  showBtnRepre = true;
  representante = new Representante(null, '', '', '', '', '', '');

  // modal tipo equipo
  modalTipoOpen = false;
  modalTipoTitle: string;
  isEditTipo = false;
  showBtnTipo = true;
  tipoEquipo = new TipoEquipo(null, '', '', '', '', '');

  // modal modelo equipo
  modalModeloOpen = false;
  modalModeloTitle: string;
  isEditModelo = false;
  showBtnModelo = true;
  modeloEquipo = new ModeloEquipo(null, '', '', '');

  // modal ubicación equipo
  modalUbicacionOpen = false;
  modalUbicacionTitle: string;
  isEditUbicacion = false;
  showBtnUbicacion = true;
  ubicacion = new Ubicacion(null, '', '', '', '');

  // equipo
  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();
  representantes = new Array<Representante>();
  repreSeleccionado: string;
  ubicaciones = new Array<Ubicacion>();

  // error
  errorMessage: string;
  error: boolean;

  // subscriptions
  private subscriptionSaveEquipo: ISubscription;

  constructor(private equipoService: EquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.buttonTitleRepre = 'Add';
    this.buttonTitleTipo = 'Add';
    this.buttonTitleModelo = 'Add';
    this.buttonTitleUbicacion = 'Add';
    this.getAllTipos();
    this.getAllModelos();
    this.getAllUbicaciones();
    this.getAllRepresentantes();

    if(this.isEdit) {
      this.onSelectedRepresentante(this.equipo.representante.id);
    }

  }

  ngOnDestroy() {
    if (this.subscriptionSaveEquipo != null) {
      this.subscriptionSaveEquipo.unsubscribe();
    }
  }


  onChange(event) {
    console.log(event);
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
   * Cuando se presiona el botón para agregar o editar los datos del tipo de equipo.
   */
  addTipoEquipo(): void {
    this.modalTipoTitle = 'Agregar Tipo de Equipo';
    if (this.isEditTipo) {
      this.tipoEquipo = this.equipo.tipoEquipo;
      this.equipo.tipoEquipo = null;
      this.deleteTipoEquipoFromTipoEquipos(this.tipoEquipo);
      this.modalTipoTitle = 'Editar Tipo de Equipo';
    }
    this.modalTipoOpen = true;
  }

  /**
   * Se quita de la lista de quipos existentes, el tipo de equipo que se quiere  editar.
   * @param tipoEquipo
   */
  deleteTipoEquipoFromTipoEquipos(tipoEquipo: TipoEquipo): void {
    for (let i = 0; i < this.tipos.length; i++) {
      if (tipoEquipo.id === this.tipos[i].id) {
        this.tipos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando se agregan los datos del tipo de quipo.
   */
  onAddTipoEquipo(): void {
    this.tipos.push(this.tipoEquipo); // tipo equipo creado/modificado se agrega a la lista de tipo equipos existentes
    this.showBtnTipo = false;
    this.equipo.tipoEquipo = this.tipoEquipo;
    this.modalTipoOpen = false
  }

  /**
   * Cuando se cancela la edición de un tipo de equipo, se vuelve a
   * agregar el tipo de equipo que se eliminó de la lista.
   */
  onCancelTipoEquipo(): void {
    if (this.isEditTipo) {
      this.tipos.push(this.tipoEquipo);
      this.equipo.tipoEquipo = this.tipoEquipo;
    }
    this.showBtnTipo = false;
    this.modalTipoOpen = false
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos de un representante.
   */
  addRepresentante(): void {
    this.modalRepreTitle = 'Agregar Representante';
    if (this.isEditRepre) {
      this.representante = this.equipo.representante;
      this.deleteRepresentanteFromRepresentantes(this.representante);
      this.modalRepreTitle = 'Editar Representante';
    }
    this.modalRepreOpen = true;
  }

  /**
   * Cuando se agrega los datos de un representante.
   */
  onAddRepresentante(): void {
    this.representantes.push(this.representante);
    this.showBtnRepre = false;
    this.equipo.representante = this.representante;
    this.modalRepreOpen = false
  }

  /**
   * Se quita de la lista de representantes, el representante que se quiere  editar.
   * @param representante
   */
  deleteRepresentanteFromRepresentantes(representante: Representante): void {
    for (let i = 0; i < this.representantes.length; i++) {
      if (representante.id === this.representantes[i].id) {
        this.representantes.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando se cancela la edición de un representante, se vuelve a
   * agregar el representante que se eliminó de la lista.
   */
  onCancelRepresentante(): void {
    if (this.isEditRepre) {
      this.representantes.push(this.representante);
      this.equipo.representante = this.representante;
    }
    this.showBtnRepre = false;
    this.modalRepreOpen = false
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos del modelo del equipo.
   */
  addModeloEquipo(): void {
    this.modalModeloTitle = 'Agregar Modelo del Equipo';
    if (this.isEditModelo) {
      this.modeloEquipo = this.equipo.modeloEquipo;
      this.deleteModeloEquipoFromModelos(this.modeloEquipo);
      this.modalModeloTitle = 'Editar Modelo del Equipo';
    }
    this.modalModeloOpen = true;
  }

  /**
   * Se quita de la lista de modelos existentes, el modelo de equipo que se quiere  editar.
   * @param modeloEquipo
   */
  deleteModeloEquipoFromModelos(modeloEquipo: ModeloEquipo): void {
    for (let i = 0; i < this.modelos.length; i++) {
      if (modeloEquipo.id === this.modelos[i].id) {
        this.modelos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando se agregan los datos del modelo del quipo.
   */
  onAddModeloEquipo(): void {
    this.modelos.push(this.modeloEquipo); // modelo creado/modificado se agrega a la lista de modelos existentes
    this.showBtnModelo = false;
    this.equipo.modeloEquipo = this.modeloEquipo;
    this.modalModeloOpen = false
  }

  /**
   * Cuando se cancela la edición de un modelo, se vuelve a
   * agregar el modelo de equipo que se eliminó de la lista.
   */
  onCancelModeloEquipo(): void {
    if (this.isEditModelo) {
      this.modelos.push(this.modeloEquipo);
      this.equipo.modeloEquipo = this.modeloEquipo;
    }
    this.modalModeloOpen = false
  }

  /**
   * Cuando se presiona el botón para agregar o editar los datos de la ubicación de un equipo.
   */
  addUbicacionEquipo(): void {
    this.modalUbicacionTitle = 'Agregar Ubicación del Equipo';
    if (this.isEditUbicacion) {
      this.ubicacion = this.equipo.ubicacion;
      this.deleteUbicacionFromList(this.ubicacion);
      this.modalUbicacionTitle = 'Editar Ubicación del Equipo';
    }
    this.modalUbicacionOpen = true;
  }

  /**
   * Se quita de la lista de ubicaciones existentes, la ubicacion de equipo que se quiere editar.
   * @param ubicacion
   */
  deleteUbicacionFromList(ubicacion: Ubicacion): void {
    for (let i = 0; i < this.ubicaciones.length; i++) {
      if (ubicacion.id === this.ubicaciones[i].id) {
        this.ubicaciones.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando se agregan los datos de la ubicación de un equipo.
   */
  onAddUbicacionEquipo(): void {
    this.ubicaciones.push(this.ubicacion); // ubicacion creada/modificada se agrega a la lista de ubicaciones existentes
    this.showBtnUbicacion = false;
    this.equipo.ubicacion = this.ubicacion;
    this.modalUbicacionOpen = false;
  }

  /**
   * Cuando se cancela la edición de un modelo, se vuelve a
   * agregar el modelo de equipo que se eliminó de la lista.
   */
  onCancelUbicacionEquipo(): void {
    if (this.isEditUbicacion) {
      this.ubicaciones.push(this.ubicacion);
      this.equipo.ubicacion = this.ubicacion;
    }
    this.modalUbicacionOpen = false
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
  onSelectedTipoEquipo(event): void {
    if (event != '' && event.target.value != '') {
      this.getTipoEquipoById(+event.target.value);
    } else {
      this.equipo.tipoEquipo = this.tipoEquipo;
    }
    this.buttonTitleTipo = 'Edit';
    this.isEditTipo = true;
    this.showBtnTipo = true;
  }

  /**
   * Se obtiene el tipo de equipo seleccionado.
   * @param {number} id
   */
  getTipoEquipoById(id: number): void {
    this.equipoService.getTipoEquipoById(id).subscribe(
      tipo => {
        this.equipo.tipoEquipo = tipo;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  /**
   * Se selecciona un modelo para el equipo.
   * @param value
   */
  onSelectedModeloEquipo(event): void {
    if (event != '') {
      this.getModeloEquipoById(+event);
    } else {
      this.equipo.modeloEquipo = this.modeloEquipo;
    }
    this.buttonTitleModelo = 'Edit';
    this.isEditModelo = true;
    this.showBtnModelo = true;
  }

  /**
   * Se obtiene el modelo seleccionado para el equipo.
   * @param {number} id
   */
  getModeloEquipoById(id: number): void {
    this.equipoService.getModeloEquipoById(id).subscribe(
      modelo => {
        this.equipo.modeloEquipo = modelo;
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
  onSelectedRepresentante(event): void {
    if (event != '' && event.target.value != '') {
      this.getRepresentanteById(+event.target.value);
    } else {
      this.equipo.representante = this.representante;
      this.repreSeleccionado = this.representante.nombre;
    }
    this.buttonTitleRepre = 'Edit';
    this.isEditRepre = true;
    this.showBtnRepre = true;
  }

  /**
   * Se obtiene el representante seleccionado de la lista.
   * @param {number} id
   */
  getRepresentanteById(id: number): void {
    this.representanteService.getRepresentanteById(id).subscribe(
      representante => {
        this.equipo.representante = representante;
        this.repreSeleccionado = representante.nombre;
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
  onSelectedUbicacionEquipo(event): void {
    if (event != '') {
      this.getUbicacionEquipoById(+event);
    } else {
      this.equipo.ubicacion = this.ubicacion;
    }
    this.buttonTitleUbicacion = 'Edit';
    this.isEditUbicacion = true;
    this.showBtnUbicacion = true;
  }

  /**
   * Se obtiene la ubicación seleccionada para el equipo.
   * @param {number} id
   */
  getUbicacionEquipoById(id: number): void {
    this.equipoService.getUbicacionById(id).subscribe(
      ubicacion => {
        this.equipo.ubicacion = ubicacion;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se guarda la información del equipo creado o editado.
   */
  onSaveEquipo(): void {
    console.log('onSaveEquipo() ', this.equipo);
    if (this.isEdit) {
      this.editEquipo();
    } else {
      this.saveEquipo();
    }
  }

  /**
   * Se crea un nuevo equipo.
   */
  saveEquipo(): void {
    this.subscriptionSaveEquipo = this.equipoService.crearEquipo(this.equipo).subscribe(
      equipo => {
        this.equipo = equipo;
        this.onCloseAddEditEquipo();
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se actualizan los datos del equipo seleccionado.
   */
  editEquipo(): void {
    this.subscriptionSaveEquipo = this.equipoService.editarEquipo(this.equipo).subscribe(
      equipo => {
        this.equipo = equipo;
        this.onCloseAddEditEquipo();
      },
      error => {
        this.errorMessage = error;
        this.error = true;

      }
    );
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
