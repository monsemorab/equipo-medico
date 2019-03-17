import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Equipo} from "../../domain/equipo";
import {EquipoService} from "../../service/equipo.service";

@Component({
  selector: 'app-equipo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  // equipo
  selectedEquipo: Equipo;

  // form
  formTitle: string;
  isEdit: boolean;
  showFormAbmEquipo = false;

  // modal
  modalConfirmOpen: boolean;

  // success actions
  successMessage: string;
  success: boolean;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  equipos: Equipo[];

  constructor(private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.modalConfirmOpen = false;
    this.selectedEquipo = null;
    this.getEquipos();
  }


  /**
   * Se obtiene la lista de todos los equipos.
   */
  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(
      list => {
        this.equipos = list;
        this.total = list.length;
        this.loading = false;
        console.log(this.equipos)
      },
      error => {
        this.equipos = [];
        this.loading = false;
      }
    );

  }

  /**
   * Cuando se selecciona un Equipo de la lista.
   * @param {Equipo} equipo
   */
  selectEquipo(equipo: Equipo): void {
    this.selectedEquipo = equipo;
    console.log('selectedEquipo ', this.selectedEquipo);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editEquipo() {
    this.formTitle = 'Editar Equipo';
    this.isEdit = true;
    this.showFormAbmEquipo = true;

  }

  /**
   * Cuando se presiona el botón Add.
   */
  addEquipo() {
    this.selectedEquipo = new Equipo(null, '', '', '', '',
      '', '', null, null, null, null,
      null, null, null, '', '', '');
    this.formTitle = 'Crear Equipo';
    this.isEdit = false;
    this.showFormAbmEquipo = true;
  }

  /**
   * Eliminar un Equipo.
   */
  deleteEquipo() {
    this.error = false;
    this.modalConfirmOpen = true;
  }

  /**
   * Cuando se confirma la eliminación del equipo seleccionado.
   */
  confirmarEliminacion(): void {
    // TODO: ver si es una eliminación lógica o fisica.
    this.modalConfirmOpen = false;
    this.successMessage = 'Equipo eliminado exitosamente';
    this.success = true;
    this.selectedEquipo = null;
    this.getSuccessMessage();
  }

  getSuccessMessage() {
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  /**
   * Respuesta recibida por el hijo al terminar una creación o editión de un equipo.
   * @param {boolean} value
   */
  onCloseAddEditEquipo(value: boolean) {
    this.showFormAbmEquipo = !value;
    this.getEquipos();
    if (this.isEdit) {
      this.successMessage = 'Equipo modificado exitosamente';
      this.isEdit = false;
    } else {
      this.successMessage = 'Equipo creado exitosamente';
    }
    this.selectedEquipo = null;
    this.getSuccessMessage();
  }

  /**
   * Respuesta recibida desde el hijo cuando se cancela la edición o creación de un nuevo equipo.
   * @param {boolean} value
   */
  onCancelAddEditEquipo(value: boolean) {
    this.showFormAbmEquipo = !value;
    this.getEquipos();
    this.isEdit = false;
    this.selectedEquipo = null;
  }

}
