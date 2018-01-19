import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ContratoService} from "../../../service/contrato.service";
import {Router} from "@angular/router";
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

  // contrato
  contrato: Contrato;
  estadosContrato: EstadoContrato[];
  estadoContratoNombre: string;

  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;

  // form
  tituloForm: string;
  buttonTitle: string;
  showInformation = false;
  isEdit: boolean;

  // error
  errorMessage: string;
  error: boolean;

  constructor(private contratoService: ContratoService,
              private equipoService: EquipoService,
              private router: Router) {
    /**
     * Cuando se intenta editar un contrato seleccionado.
     */
    this.contratoService.changeEmittedContrato.subscribe(
      contrato => {
        this.contrato = contrato;
        console.log('contrato en edit form', this.contrato);
        this.showInformation = true;
      }
    );

    this.contratoService.changeEmittedEdit.subscribe(
      isEdit => {
        this.isEdit = isEdit;
        console.log('isEdit', this.isEdit);
        if (this.isEdit) {
          this.buttonTitle = 'Edit';
          this.tituloForm = 'Editar Contrato';
        } else {
          this.buttonTitle = 'Add';
          this.tituloForm = 'Agregar Contrato';
        }
      }
    );

  }

  ngOnInit() {
    this.getEquipos();
    this.getEstadoContratos();
    this.onSelectedEstadoContrado('Seleccionar Estado');
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
    if (value !== 'Seleccionar Estado') {
      this.contrato.estadoContrato = value;
    }
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
    this.goBack();
  }


  /**
   * Se redirecciona a la pagina anterior.
   */
  goBack(): void {
    this.contrato = new Contrato(null, null, '', '',
      '', '', '', [], '', '');
    this.contratoService.emitChangeEdit(false);
    this.contratoService.emitChangeContrato(this.contrato);
    this.router.navigate(['home/contratos']);
  }

}
