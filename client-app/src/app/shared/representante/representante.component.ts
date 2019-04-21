import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Representante} from "../../domain/representante";

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.css']
})
export class RepresentanteComponent implements OnInit {

  // modal for add/edit representante
  modalRepreOpen: boolean;
  modalRepreTitle: string;

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

  constructor() { }

  ngOnInit() {
    this.clearRepreField();

    if (this.representante == null) {
      this.modalRepreTitle = 'Crear Representante';
      this.id = -1;
    } else {
      this.modalRepreTitle = 'Editar Representante';
      this.id = this.representante.id;
      this.nombre = this.representante.nombre;
      this.direccion = this.representante.direccion;
      this.email = this.representante.email;
      this.telefono = this.representante.telefono;
      this.telefonoContacto = this.representante.telefonoContacto;
      this.celular = this.representante.celular;
      this.isEditRepre = true;
    }
    this.modalRepreOpen = true;
  }


  addRepresentante() {
    this.representante = new Representante(this.id, this.nombre, this.direccion, this.email, this.telefono,
      this.telefonoContacto, this.celular);
    this.representanteToUpdate.emit(this.representante);
  }



  /**
   * Cuando se cancela la edición o la creación de un representante.
   * Si se cancela la edición, el representante seleccionado es agregado de nuevo la la lista de representantes.
   */
  onCancelAddEditRepresentante() {
    this.cancelAddEditRepre.emit(this.representante);
  }


  clearRepreField() {
    this.nombre = "";
    this.direccion = "";
    this.email = "";
    this.telefono = "";
    this.telefonoContacto = "";
    this.celular = "";
  }

}
