import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SolicitudRepuesto} from "../../../domain/solicitud";
import {Repuesto} from "../../../domain/repuesto";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {Representante} from "../../../domain/representante";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {SolicitudService} from "../../../service/solicitud.service";
import {EquipoService} from "../../../service/equipo.service";

@Component({
  selector: 'app-add-edit-solicitud-repuesto',
  templateUrl: './add-edit-solicitud-repuesto.component.html',
  styleUrls: ['./add-edit-solicitud-repuesto.component.css']
})
export class AddEditSolicitudRepuestoComponent implements OnInit {
  @Input() solicitudRepuesto: SolicitudRepuesto;
  @Input() selectedSolicitudRepuesto: SolicitudRepuesto;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // form
  buttonTitleResp: string;
  buttonTitleRepre: string;
  buttonTitleRepuesto: string;

  // modal responsable
  modalResponsableOpen = false;
  modalTitleRepre: string;


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
  representante: Representante;

  // error
  errorMessage: string;
  error: boolean;

  constructor(private solicitudService: SolicitudService,
              private equipoService: EquipoService) {
  }

  ngOnInit() {

    this.tipoEquipoNombre = 'Agregar Tipo';
    this.modeloEquipoNombre = 'Agregar Modelo';
    this.buttonTitleRepre = 'Add';
    // this.buttonTitleResp = 'Add';
    // this.buttonTitleRepuesto = 'Add';
    if (this.isEdit) {
      this.buttonTitleRepre = 'Edit';
      // this.buttonTitleResp = 'Edit';
      // this.buttonTitleRepuesto = 'Edit';
    }
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

  addRepresentante(): void {
    this.modalTitleRepre = 'Agregar Personal Responsable';
    if (this.isEdit) {
      this.representante = this.selectedRepuesto.representante;
      this.modalTitleRepre = 'Editar Datos del Personal Responsabl';
    }
    this.modalResponsableOpen = true;
  }

  onAddRepresentante(): void {
    this.representante = new Representante(null, '', '', '', '', '',
      '');
    this.selectedRepuesto.representante = this.representante;
    this.buttonTitleRepre = 'Edit';
    this.modalResponsableOpen = false
  }

}
