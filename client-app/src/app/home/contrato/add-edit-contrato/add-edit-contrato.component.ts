import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ContratoService} from "../../../service/contrato.service";
import {Contrato, EstadoContrato} from "../../../domain/contrato";
import {EquipoService} from "../../../service/equipo.service";
import {Equipo} from "../../../domain/equipo";

@Component({
  selector: 'app-add-edit-contrato',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-edit-contrato.component.html',
  styleUrls: ['./add-edit-contrato.component.css']
})
export class AddEditContratoComponent implements OnInit {

  @Input() contrato: Contrato;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // contrato
  estadosContrato: EstadoContrato[];
  estadoContratoNombre: string;

  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;

  // form
  buttonTitle: string;

  // error
  errorMessage: string;
  error: boolean;

  constructor(private contratoService: ContratoService,
              private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.getEquipos();
    this.getEstadoContratos();
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
    this.equipoId = null;
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
