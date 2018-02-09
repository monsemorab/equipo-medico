import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ContratoService} from "../../../service/contrato.service";
import {Contrato, EstadoContrato} from "../../../domain/contrato";
import {EquipoService} from "../../../service/equipo.service";
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";

@Component({
  selector: 'app-add-edit-contrato',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-edit-contrato.component.html',
  styleUrls: ['./add-edit-contrato.component.css']
})
export class AddEditContratoComponent implements OnInit, AfterViewInit {

  @ViewChild('contratoId') contratoIdElement: ElementRef;

  @Input() contrato: Contrato;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // contrato
  estadosContrato: EstadoContrato[];

  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;
  isSelectedEquipo: boolean;

  // modal representante
  modalRepreOpen = false;
  modalTitle: string;
  representante = new Representante(null, '', '', '', '');

  // form
  buttonTitle: string;

  // error
  errorMessage: string;
  error: boolean;

  constructor(private contratoService: ContratoService,
              private equipoService: EquipoService) {

    this.isSelectedEquipo = false;
  }

  ngOnInit() {
    this.buttonTitle = 'Add';
    this.getEquipos();
    this.getEstadoContratos();
  }

  ngAfterViewInit() {
    this.contratoIdElement.nativeElement.focus();
  }


  /**
   * Se obtiene la lista de todos los equipos que esten sin contrato.
   */
  getEquipos(): void {
    this.equipoService.getEquiposSinContratos().subscribe(
      equipos => {
        this.equipos = equipos;
      },
      error => {
        this.errorMessage = error,
          this.equipos = null;
      }
    );
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   */
  getEstadoContratos(): void {
    this.contratoService.getEstadosContrato().subscribe(
      estados => {
        this.estadosContrato = estados;
      },
      error => {
        this.errorMessage = error,
          this.estadosContrato = null;
      }
    );
  }

  /**
   * Se selecciona un estado para el contrato.
   * @param {string} value
   */
  onSelectedEstadoContrado(value: string): void {
    this.contrato.estadoContrato = value;
  }

  /**
   * Se selecciona un equipo para el contrato.
   * @param {number} value
   */
  onSelectedEquipo(value: number): void {
    this.getEquipoById(value);
  }

  /**
   * Se obtiene el equipo seleccionado por su Id.
   * @param {number} id
   */
  getEquipoById(id: number): void {
    this.equipoService.getEquipoById(id).subscribe(
      equipo => {
        this.selectedEquipo = equipo;
        this.equipoId = equipo.id;
      },
      error => {
        this.errorMessage = error;
        this.selectedEquipo = null;
      }
    );
  }

  /**
   * Se agrega el equipo seleccionado a una lista de equipos para el contrato.
   */
  addEquipo(): void {
    this.selectedEquipos.push(this.selectedEquipo);
    for(let i=0; i < this.equipos.length; i++) {
      if(this.selectedEquipo = this.equipos[i]) {
        this.equipos.splice(i, 1);
      }
    }
    this.equipoId = null;
    this.selectedEquipo = null;
  }

  /**
   * Cuando se selecciona un equipo de la lista de equipos agregados.
   * @param {Equipo} equipo
   */
  onSelectEquipo(equipo: Equipo): void {
    this.selectedEquipo = equipo;
    this.isSelectedEquipo = true;
  }

  /**
   * Se elimina el equipo seleccionado de la lista de equipos agregados.
   */
  onDeleteEquipo() {
    for (let i = 0; i < this.selectedEquipos.length; i++) {
      if (this.selectedEquipos[i] === this.selectedEquipo) {
        this.selectedEquipos.splice(i, 1);
        this.equipos.push(this.selectedEquipo);
        this.isSelectedEquipo = false;
        this.selectedEquipo = null;
        break;
      }
    }
  }

  addRepresentante(): void {
    this.modalTitle = 'Agregar Datos del Representante';
    if (this.isEdit) {
      this.representante = this.contrato.representante;
      this.modalTitle = 'Editar Datos del Representante';
    }
    this.modalRepreOpen = true;
  }

  onAddRepresentante(): void {
    this.contrato.representante = this.representante;
    this.buttonTitle = 'Edit';
    this.modalRepreOpen = false
  }

  /**
   * Se guarda la información del contrato creado o editado.
   */
  onSaveContrato(): void {
    console.log('onSaveContrato() ', this.contrato);
    this.onCloseAddEditContrato();
  }


  /**
   * Cuando la edición o la creación de un contrato se finaliza.
   */
  onCloseAddEditContrato() {
    this.onFinished.emit(true);
  }

  /**
   * Cuando se cancela la edición o creación de un contrato.
   */
  onCancelAddEditContrato() {
    this.onCanceled.emit(true);
  }

}
