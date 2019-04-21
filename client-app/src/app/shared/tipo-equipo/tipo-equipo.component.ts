import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoEquipo} from "../../domain/tipo-equipo";

@Component({
  selector: 'app-tipo-equipo',
  templateUrl: './tipo-equipo.component.html',
  styleUrls: ['./tipo-equipo.component.css']
})
export class TipoEquipoComponent implements OnInit {

  // modal add/edit tipo equipo
  modalTipoOpen = false;
  modalTipoTitle: string;

  // TipoEquipo
  @Input() tipoEquipo: TipoEquipo;
  @Input() isEditTipo: boolean;
  @Output() tipoEquipoToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditTipo: EventEmitter<any> = new EventEmitter();

  // Datos TipoEquipo
  id: number;
  tipo: string;
  codigoECRIUMDNS: string;
  clase: string;
  mpano: string;
  personalACargo: string;


  constructor() {
  }

  ngOnInit() {

    this.clearTipoEquipoField();

    if (this.tipoEquipo == null) {
      this.modalTipoTitle = 'Crear Tipo de Equipo';
      this.id = -1;
    } else {
      this.modalTipoTitle = 'Editar Tipo de Equipo';
      this.id = this.tipoEquipo.id;
      this.tipo = this.tipoEquipo.tipo;
      this.codigoECRIUMDNS = this.tipoEquipo.codigoECRIUMDNS;
      this.clase = this.tipoEquipo.clase;
      this.mpano = this.tipoEquipo.mpano;
      this.personalACargo = this.tipoEquipo.personalACargo;
      this.isEditTipo = true;
    }
    this.modalTipoOpen = true;
  }


  /**
   * Se crea el objeto con los datos ingresados para el tipo.
   */
  addTipoEquipo() {
    this.tipoEquipo = new TipoEquipo(this.id, this.tipo, this.codigoECRIUMDNS, this.clase, this.mpano, this.personalACargo);
    this.tipoEquipoToUpdate.emit(this.tipoEquipo);
  }


  /**
   * Cuando se cancela la edición o la creación de un tipo para un equipo.
   * Si se cancela la edición, el tipo de equipo seleccionado es agregado de nuevo la la lista de tipos.
   */
  onCancelAddEditTipoEquipo() {
    this.cancelAddEditTipo.emit(this.tipoEquipo);
  }


  /**
   * Se inicializan los valores de los campos.
   */
  clearTipoEquipoField() {
    this.tipo = '';
    this.codigoECRIUMDNS = '';
    this.clase = '';
    this.mpano = '';
    this.personalACargo = '';
  }

}
