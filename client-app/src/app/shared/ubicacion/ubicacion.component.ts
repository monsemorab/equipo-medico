import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ubicacion} from "../../domain/ubicacion";

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  // modal add/edit ubicación
  modalUbicacionOpen = false;
  modalUbicacionTitle: string;

  // Ubicación
  @Input() ubicacion: Ubicacion;
  @Input() isEditUbicacion: boolean;
  @Output() ubicacionToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditUbicacion: EventEmitter<any> = new EventEmitter();

  // Datos Ubicación
  id: number;
  servicio: string;
  bloque: string;
  numeroSala: string;
  nivel: string;

  constructor() {
  }

  ngOnInit() {
    this.clearUbicacionField();

    if (this.ubicacion == null) {
      this.modalUbicacionTitle = 'Crear Ubicación';
      this.id = -1;
    } else {
      this.modalUbicacionTitle = 'Editar Datos de Ubicación';
      this.id = this.ubicacion.id;
      this.servicio = this.ubicacion.servicio;
      this.bloque = this.ubicacion.bloque;
      this.numeroSala = this.ubicacion.numeroSala;
      this.nivel = this.ubicacion.nivel;
      this.isEditUbicacion = true;
    }
    this.modalUbicacionOpen = true;
  }


  /**
   * Se crea el objeto con los datos ingresados para el tipo.
   */
  addUbicacion() {
    this.ubicacion = new Ubicacion(this.id, this.servicio, this.bloque, this.numeroSala, this.nivel);
    this.ubicacionToUpdate.emit(this.ubicacion);
  }


  /**
   * Cuando se cancela la edición o la creación de una ubicación para un equipo.
   * Si se cancela la edición, la ubicación seleccionada es agregada de nuevo la la lista de ubicaciones.
   */
  onCancelAddEditUbicacion() {
    this.cancelAddEditUbicacion.emit(this.ubicacion);
  }


  /**
   * Se inicializan los valores de los campos.
   */
  clearUbicacionField() {
    this.servicio = '';
    this.bloque = '';
    this.numeroSala = '';
    this.nivel = '';
  }

}
