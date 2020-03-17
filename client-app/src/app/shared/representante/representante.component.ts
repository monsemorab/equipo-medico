import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Representante} from '../../domain/representante';
import {RepresentanteService} from '../../service/representante.service';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.css']
})
export class RepresentanteComponent implements OnInit {

  // modal for add/edit representante
  modalRepreOpen: boolean;
  modalRepreTitle: string;
  btnTitle: string;

  // Representante
  @Input() representante: Representante;
  @Input() isEditRepre: boolean;
  @Output() representanteToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditRepre: EventEmitter<any> = new EventEmitter();


  // Datos representante
  id: number;
  nombre: string;
  direccion: string;
  email: string;
  telefono: string;
  telefonoContacto: string;
  celular: string;

  // error
  errorMessage: string;
  error: boolean;

  constructor(private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.clearRepreField();

    if (this.representante == null) {
      this.modalRepreTitle = 'Crear Representante';
      this.id = -1;
      this.btnTitle = 'Crear';
    } else {
      this.modalRepreTitle = 'Editar Representante';
      this.btnTitle = 'Guardar';
      this.isEditRepre = true;
      this.id = this.representante.id;
      this.nombre = this.representante.nombre;
      this.direccion = this.representante.direccion;
      this.email = this.representante.email;
      this.telefono = this.representante.telefono;
      this.telefonoContacto = this.representante.telefonoContacto;
      this.celular = this.representante.celular;
    }
    this.modalRepreOpen = true;
  }


  addRepresentante() {
    this.representante = new Representante(this.id, this.nombre, this.direccion, this.email, this.telefono,
      this.telefonoContacto, this.celular);
    if (this.isEditRepre) {
      this.editarRepresentanteExistente(this.representante);
    } else {
      this.agregarRepresentanteCreado(this.representante);
    }
  }

  /**
   * Se crea un nuveo representante de equipo.
   * @param representante
   */
  agregarRepresentanteCreado(representante: Representante) {
    this.representanteService.crearRepresentanteEquipo(representante).subscribe(
      respuesta => {
        this.representante = respuesta;
        this.representanteToUpdate.emit(this.representante);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Se guardan los datos editados del representante seleccionado.
   * @param representante
   */
  editarRepresentanteExistente(representante: Representante) {
    this.representanteService.editarRepresentanteoEquipo(representante).subscribe(
      respuesta => {
        this.representante = respuesta;
        this.representanteToUpdate.emit(this.representante);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Cuando se cancela la edición o la creación de un representante,
   * se obtiene la lista de todos los representantes almacenados en la BD.
   */
  onCancelAddEditRepresentante() {
    this.cancelAddEditRepre.emit(this.representante);
  }


  clearRepreField() {
    this.nombre = '';
    this.direccion = '';
    this.email = '';
    this.telefono = '';
    this.telefonoContacto = '';
    this.celular = '';
  }

}
