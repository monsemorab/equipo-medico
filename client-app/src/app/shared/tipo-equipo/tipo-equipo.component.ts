import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoEquipo} from '../../domain/tipo-equipo';
import {TipoEquipoService} from '../../service/tipo-equipo.service';

@Component({
  selector: 'app-tipo-equipo',
  templateUrl: './tipo-equipo.component.html',
  styleUrls: ['./tipo-equipo.component.css']
})
export class TipoEquipoComponent implements OnInit {

  // modal add/edit tipo equipo
  modalTipoOpen = false;
  modalTipoTitle: string;
  btnTitle: string;

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

  // error
  errorMessage: string;
  error: boolean;


  constructor(private tipoEquipoService: TipoEquipoService) {
  }

  ngOnInit() {

    this.clearTipoEquipoField();

    if (this.tipoEquipo == null) {
      this.modalTipoTitle = 'Crear Tipo de Equipo';
      this.id = -1;
      this.btnTitle = 'Crear';
    } else {
      this.modalTipoTitle = 'Editar Tipo de Equipo';
      this.id = this.tipoEquipo.id;
      this.tipo = this.tipoEquipo.tipo;
      this.codigoECRIUMDNS = this.tipoEquipo.codigoECRIUMDNS;
      this.clase = this.tipoEquipo.clase;
      this.mpano = this.tipoEquipo.mpano;
      this.personalACargo = this.tipoEquipo.personalACargo;
      this.btnTitle = 'Guardar';
      this.isEditTipo = true;
    }
    this.modalTipoOpen = true;
  }


  /**
   * Se crea el objeto con los datos ingresados para el tipo.
   */
  addTipoEquipo() {
    this.tipoEquipo = new TipoEquipo(this.id, this.tipo, this.codigoECRIUMDNS, this.clase, this.mpano, this.personalACargo);
    if (this.isEditTipo) {
      this.editarTipoEquipoExistente(this.tipoEquipo);
    } else {
      this.agregarTipoEquipoCreado(this.tipoEquipo);
    }
  }

  /**
   * Se crea un nuveo tipo de equipo.
   * @param tipo
   */
  agregarTipoEquipoCreado(tipo: TipoEquipo) {
    this.tipoEquipoService.crearTipoEquipo(tipo).subscribe(
      respuesta => {
        this.tipoEquipo = respuesta;
        this.tipoEquipoToUpdate.emit(this.tipoEquipo);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Se guardan los datos editados del tipo seleccionado.
   * @param tipo
   */
  editarTipoEquipoExistente(tipo: TipoEquipo) {
    this.tipoEquipoService.editarTipoEquipo(tipo).subscribe(
      respuesta => {
        this.tipoEquipo = respuesta;
        this.tipoEquipoToUpdate.emit(this.tipoEquipo);
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }


  /**
   * Cuando se cancela la edición o la creación de un tipo para un equipo,
   * se obtiene la lista de todos los tipos de equipos almacenados en la BD.
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
