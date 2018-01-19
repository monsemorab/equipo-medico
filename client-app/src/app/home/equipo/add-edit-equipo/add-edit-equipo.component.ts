import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {EquipoService} from "../../../service/equipo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-equipo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-edit-equipo.component.html',
  styleUrls: ['./add-edit-equipo.component.css']
})
export class AddEditEquipoComponent implements OnInit {

  // form
  tituloForm: string;
  buttonTitle: string;
  showInformation = false;
  isEdit: boolean;

  // modal representante
  modalRepreOpen = false;
  modalTitle: string;

  // equipo
  equipo: Equipo;
  tipos: TipoEquipo[];
  selectedTipo: TipoEquipo;
  tipoEquipoNombre: string;
  modelos: ModeloEquipo[];
  selectedModelo: ModeloEquipo;
  modeloEquipoNombre: string;
  representante = new Representante(null, '', '', '', '');

  // error
  errorMessage: string;
  error: boolean;

  constructor(private equipoService: EquipoService,
              private router: Router) {
    /**
     * Cuando se intenta editar un equipo seleccionado.
     */
    this.equipoService.changeEmittedEquipo.subscribe(
      equipo => {
        this.equipo = equipo;
        console.log('equipo en edit form', this.equipo);
        this.showInformation = true;
      }
    );

    this.equipoService.changeEmittedEdit.subscribe(
      isEdit => {
        this.isEdit = isEdit;
        console.log('isEdit', this.isEdit);
        if (this.isEdit) {
          this.buttonTitle = 'Edit';
          this.tituloForm = 'Editar Equipo';
        } else {
          this.buttonTitle = 'Add';
          this.tituloForm = 'Agregar Equipo';
        }
      }
    );
  }

  ngOnInit() {
    this.tipoEquipoNombre = 'Seleccionar Tipo';
    this.modeloEquipoNombre = 'Seleccionar Modelo';
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
        this.errorMessage = error,
          this.tipos = null;
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
        this.errorMessage = error,
          this.modelos = null;
      }
    );
  }

  addRepresentante(): void {
    this.modalTitle = 'Agregar Representante';
    if (this.isEdit) {
      this.representante = this.equipo.representante;
      this.modalTitle = 'Editar Representante';
    }
    this.modalRepreOpen = true;
  }

  onAddRepresentante(): void {
    this.equipo.representante = this.representante;
    this.buttonTitle = 'Edit';
    this.modalRepreOpen = false
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
        this.errorMessage = error,
          this.selectedModelo = null;
      }
    );
  }

  /**
   * Se guarda la información del equipo creado o editado.
   */
  onSaveEquipo(): void {
    console.log('onSaveEquipo() ', this.equipo);
    this.goBack();
  }


  /**
   * Se redirecciona a la pagina anterior.
   */
  goBack(): void {
    this.equipo = new Equipo(null, null, null, null, '', '',
      '', '', null, null, null, null,
      null, null, '', '', '');
    this.equipoService.emitChangeEquipo(this.equipo);
    this.router.navigate(['home/equipos']);
  }

}
