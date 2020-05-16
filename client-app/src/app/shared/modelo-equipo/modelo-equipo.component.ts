import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModeloEquipo} from '../../domain/modelo-equipo';
import {ModeloEquipoService} from '../../service/modelo-equipo.service';

@Component({
  selector: 'app-modelo-equipo',
  templateUrl: './modelo-equipo.component.html',
  styleUrls: ['./modelo-equipo.component.css']
})
export class ModeloEquipoComponent implements OnInit {

  // modal add/edit modelo equipo
  modalModeloOpen = false;
  modalModeloTitle: string;
  btnTitle: string;

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

  // error
  errorMessage: string;
  error: boolean;

  constructor(private modeloEquipoService: ModeloEquipoService) {
  }

  ngOnInit() {
    this.clearModeloEquipoField();

    if (this.modeloEquipo == null) {
      this.modalModeloTitle = 'Crear Modelo de Equipo';
      this.id = -1;
      this.btnTitle = 'Crear';
    } else {
      this.modalModeloTitle = 'Editar Modelo de Equipo';
      this.id = this.modeloEquipo.id;
      this.modelo = this.modeloEquipo.modelo;
      this.marca = this.modeloEquipo.marca;
      this.imp = this.modeloEquipo.imp;
      this.btnTitle = 'Guardar';
      this.isEditModelo = true;
    }
    this.modalModeloOpen = true;
  }

  /**
   * Se crea el objeto con los datos ingresados para el modelo.
   */
  addModeloEquipo() {
    this.modeloEquipo = new ModeloEquipo(this.id, this.modelo, this.marca, this.imp);
    if (this.isEditModelo) {
      this.editarModeloExistente(this.modeloEquipo);
    } else {
      this.agregarModeloCreado(this.modeloEquipo);
    }
  }

  /**
   * Se crea un nuveo modelo equipo.
   * @param modelo
   */
  agregarModeloCreado(modelo: ModeloEquipo) {
    this.modeloEquipoService.crearModeloEquipo(modelo).subscribe(
      respuesta => {
        this.modeloEquipo = respuesta;
        this.modeloEquipoToUpdate.emit(this.modeloEquipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se guardan los datos editados del modelo seleccionado.
   * @param modelo
   */
  editarModeloExistente(modelo: ModeloEquipo) {
    this.modeloEquipoService.editarModeloEquipo(modelo).subscribe(
      respuesta => {
        this.modeloEquipo = respuesta;
        this.modeloEquipoToUpdate.emit(this.modeloEquipo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Cuando se cancela la edición o la creación de un modelo para un equipo,
   * se obtiene la lista de todos los modelos almacenados en la BD,
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
