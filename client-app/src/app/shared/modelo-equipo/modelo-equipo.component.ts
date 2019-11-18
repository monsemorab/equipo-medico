import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModeloEquipo} from "../../domain/modelo-equipo";

@Component({
  selector: 'app-modelo-equipo',
  templateUrl: './modelo-equipo.component.html',
  styleUrls: ['./modelo-equipo.component.css']
})
export class ModeloEquipoComponent implements OnInit {

  // modal add/edit modelo equipo
  modalModeloOpen = false;
  modalModeloTitle: string;

  // ModeloEquipo
  @Input() modeloEquipo: ModeloEquipo;
  @Input() isEditModelo: boolean;
  @Output() modeloEquipoToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditModelo: EventEmitter<any> = new EventEmitter();

  // Datos ModeloEquipo
  id: number;
  modelo: string;
  marca: string;
  imp: string;

  constructor() {
  }

  ngOnInit() {
    this.clearModeloEquipoField();

    if (this.modeloEquipo == null) {
      this.modalModeloTitle = 'Crear Tipo de Equipo';
      this.id = -1;
    } else {
      this.modalModeloTitle = 'Editar Tipo de Equipo';
      this.id = this.modeloEquipo.id;
      this.modelo = this.modeloEquipo.modelo;
      this.marca = this.modeloEquipo.marca;
      this.imp = this.modeloEquipo.imp;
      this.isEditModelo = true;
    }
    this.modalModeloOpen = true;
  }

  /**
   * Se crea el objeto con los datos ingresados para el tipo.
   */
  addModeloEquipo() {
    this.modeloEquipo = new ModeloEquipo(this.id, this.modelo, this.marca, this.imp);
    this.modeloEquipoToUpdate.emit(this.modeloEquipo);
  }

  /**
   * Cuando se cancela la edición o la creación de un modelo para un equipo.
   * Si se cancela la edición, el modelo de equipo seleccionado es agregado de nuevo la la lista de modelos.
   */
  onCancelAddEditModeloEquipo() {
    this.cancelAddEditModelo.emit(this.modeloEquipo);
  }


  /**
   * Se inicializan los valores de los campos.
   */
  clearModeloEquipoField() {
    this.modelo = '';
    this.marca = '';
    this.imp = '';
  }

}
