import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ubicacion} from '../../domain/ubicacion';
import {UbicacionEquipoService} from '../../service/ubicacion-equipo.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  // modal add/edit ubicación
  modalUbicacionOpen = false;
  modalUbicacionTitle: string;
  btnTitle: string;

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

  // error
  errorMessage: string;
  error: boolean;

  constructor(private ubicacionEquipoService: UbicacionEquipoService) {
  }

  ngOnInit() {
    this.clearUbicacionField();

    if (this.ubicacion == null) {
      this.modalUbicacionTitle = 'Crear Ubicación';
      this.id = -1;
      this.btnTitle = 'Crear';
    } else {
      this.modalUbicacionTitle = 'Editar Datos de Ubicación';
      this.btnTitle = 'Guardar';
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
    if (this.isEditUbicacion) {
      this.editarUbicacionEquipoExistente(this.ubicacion);
    } else {
      this.agregarUbicacionEquipoCreado(this.ubicacion);
    }
  }


  /**
   * Se crea una nueva ubicacion para un equipo.
   * @param ubicacion
   */
  agregarUbicacionEquipoCreado(ubicacion: Ubicacion) {
    this.ubicacionEquipoService.crearUbicacionEquipo(ubicacion).subscribe(
      respuesta => {
        this.ubicacion = respuesta;
        this.ubicacionToUpdate.emit(this.ubicacion);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Se guardan los datos editados de la ubicacion seleccionada.
   * @param tipo
   */
  editarUbicacionEquipoExistente(ubicacion: Ubicacion) {
    this.ubicacionEquipoService.editarUbicacionEquipo(ubicacion).subscribe(
      respuesta => {
        this.ubicacion = respuesta;
        this.ubicacionToUpdate.emit(this.ubicacion);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Cuando se cancela la edición o la creación de una ubicación para un equipo,
   * se obtiene la lista de todas las ubicaciones existentes en la BD.
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
