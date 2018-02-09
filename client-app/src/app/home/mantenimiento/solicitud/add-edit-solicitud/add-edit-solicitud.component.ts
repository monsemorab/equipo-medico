import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SolicitudRepuesto, SolicitudServicio} from "../../../../domain/solicitud";
import {Representante} from "../../../../domain/representante";
import {SolicitudService} from "../../../../service/solicitud.service";
import {Repuesto} from "../../../../domain/repuesto";
import {Equipo} from "../../../../domain/equipo";
import {ModeloEquipo} from "../../../../domain/modelo-equipo";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {EquipoService} from "../../../../service/equipo.service";

@Component({
  selector: 'app-add-edit-solicitud',
  templateUrl: './add-edit-solicitud.component.html',
  styleUrls: ['./add-edit-solicitud.component.css']
})
export class AddEditSolicitudComponent implements OnInit {

  @Input() solicitudRepuesto: SolicitudRepuesto;
  @Input() solicitudServicio: SolicitudServicio;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Input() selectedSolicitudServicio: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // form
  buttonTitleResp: string;
  buttonTitleRepre: string;
  buttonTitleRepuesto: string;

  // modal responsable
  modalResponsableOpen = false;
  modalTitleRepre: string;
  responsable = new Representante(null, '', '', '', '');


  // modal repuestos
  modalRepuestosOpen = false;
  modalTitleRepuesto: string;
  repuesto: Repuesto;
  repuestos = new Array<Repuesto>();
  selectedRepuesto: Repuesto;
  isSelectedRepuesto: boolean;
  tipos: TipoEquipo[];
  selectedTipo: TipoEquipo;
  tipoEquipoNombre: string;
  modelos: ModeloEquipo[];
  selectedModelo: ModeloEquipo;
  modeloEquipoNombre: string;

  // error
  errorMessage: string;
  error: boolean

  constructor(private solicitudService: SolicitudService,
              private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.tipoEquipoNombre = 'Agregar Tipo';
    this.modeloEquipoNombre = 'Agregar Modelo';
    this.buttonTitleRepre = 'Add';
    this.buttonTitleResp = 'Add';
    this.buttonTitleRepuesto = 'Add';
    this.isSelectedRepuesto = false;
    this.getAllTipos();
    this.getAllModelos();
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
        this.repuesto.tipoEquipo = this.selectedTipo;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
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
        this.repuesto.modeloEquipo = this.selectedModelo;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  addResponsables(): void {
    this.modalTitleRepre = 'Agregar Responsable';
    if (this.isEdit) {
      this.responsable = this.solicitudServicio.responsable;
      this.modalTitleRepre = 'Editar Responsable';
    }
    this.modalResponsableOpen = true;
  }

  onAddResponsable(): void {
    this.solicitudServicio.responsable = this.responsable;
    this.buttonTitleRepre = 'Edit';
    this.modalResponsableOpen = false
  }

  /**
   * Al seleccionar el botón Add repuesto.
   */
  addRepuesto(): void {
    this.modalTitleRepuesto = 'Agregar Repuesto';
    this.modalRepuestosOpen = true;
    this.repuesto = new Repuesto(null, '', '', 0, 0, 0,
      null, null, null, '');
  }

  /**
   * Al agregar un repuesto.
   */
  onAddRepuesto(): void {
    this.repuestos.push(this.repuesto);
    this.solicitudRepuesto.repuestos = this.repuestos;
    this.modalRepuestosOpen = false
  }

  /**
   * Se selecciona un repuesto de la lista de repuestos agregados.
   * @param {Repuesto} value
   */
  onSelectedRepuesto(repuesto: Repuesto): void {
    this.selectedRepuesto = repuesto;
    this.isSelectedRepuesto = true;
  }

  /**
   * Se elimina el repuesto seleccionado de la lista de repuestos agregados.
   */
  onDeleteRepuesto() {
    for (let i = 0; i < this.solicitudRepuesto.repuestos.length; i++) {
      if (this.solicitudRepuesto.repuestos[i] === this.selectedRepuesto) {
        this.solicitudRepuesto.repuestos.splice(i, 1);
        this.isSelectedRepuesto = false;
        this.selectedRepuesto = null;
        break;
      }
    }
  }

  /**
   * Cuando se selecciona el botón editar de la lista de repuestos.
   */
  onEditRepuesto(): void {
    this.repuesto = this.selectedRepuesto;
    this.isSelectedRepuesto = true;
    this.modalTitleRepuesto = 'Editar Repuesto';
    this.modalRepuestosOpen = true;
  }

  /**
   * Se guarda la información de la solicitud creada o editada.
   */
  onSaveSolicitud(): void {
    console.log('onSaveSolicitud() ', this.solicitudServicio);
    this.onCloseAddEditSolicitud();
  }


  /**
   * Cuando la edición o la creación de una solicitud se finaliza.
   */
  onCloseAddEditSolicitud() {
    this.onFinished.emit(true);
  }

  /**
   * Cuando se cancela la edición o creación de una solicitud.
   */
  onCancelAddEditSolicitud() {
    this.onCanceled.emit(true);
  }

}
