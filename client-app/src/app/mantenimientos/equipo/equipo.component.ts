import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Equipo} from "../../domain/equipo";
import {EquipoService} from "../../service/equipo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-equipo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  // equipo
  selectedEquipo: Equipo;

  // modal
  titleAction: string;
  messageAction: string;
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

  constructor(private equipoService: EquipoService,
              private router: Router) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.modalConfirmOpen = false;
    this.selectedEquipo = null;
    this.getEquipos();
  }

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
    this.equipoService.emitChangeEdit(true);
    this.equipoService.emitChangeEquipo(this.selectedEquipo);
    this.goAddEditForm();

  }

  /**
   * Cuando se presiona el botón Add.
   */
  addEquipo() {
    this.selectedEquipo = new Equipo(null, null, null, null, '', '',
      '', '', null, null, null, null, null, null,
      '', '', '');
    this.equipoService.emitChangeEdit(false);
    this.equipoService.emitChangeEquipo(this.selectedEquipo);
    this.goAddEditForm();
  }

  /**
   * Redirecciona a la pagina de AddEditEquipo.
   */
  goAddEditForm(): void {
    this.router.navigate(['mantenimientos/abmEquipo']);
  }

  /**
   * Eliminar un Equipo.
   */
  deleteEquipo() {
    this.error = false;
    // ver si es una eliminación lógica o fisica.
    this.successMessage = 'Equipo eliminado exitosamente';
    this.success = true;
    this.getSuccessMessage();
  }

  getSuccessMessage() {
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

}
