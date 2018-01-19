import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Contrato} from "../../domain/contrato";
import {Router} from "@angular/router";
import {ContratoService} from "../../service/contrato.service";

@Component({
  selector: 'app-contrato',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  // contrato
  selectedContrato: Contrato;

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
  contratos: Contrato[];

  constructor(private contratoService: ContratoService,
              private router: Router) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.modalConfirmOpen = false;
    this.selectedContrato = null;
    this.getContratos();
  }

  getContratos(): void {
    this.contratoService.getContratos().subscribe(
      list => {
        this.contratos = list;
        this.total = list.length;
        this.loading = false;
        console.log(this.contratos)
      },
      error => {
        this.contratos = [];
        this.loading = false;
      }
    );

  }

  /**
   * Cuando se selecciona un Contrato de la lista.
   * @param {Contrato} contrato
   */
  selectContrato(contrato: Contrato): void {
    this.selectedContrato = contrato;
    console.log('selectedContrato ', this.selectedContrato);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editContrato() {
    this.contratoService.emitChangeEdit(true);
    this.contratoService.emitChangeContrato(this.selectedContrato);
    this.goAddEditForm();

  }

  /**
   * Cuando se presiona el botón Add.
   */
  addContrato() {
    this.selectedContrato = new Contrato(null, null, '', '',
      '', '', '', [], '', '');
    this.contratoService.emitChangeEdit(false);
    this.contratoService.emitChangeContrato(this.selectedContrato);
    this.goAddEditForm();
  }

  /**
   * Redireccionar a la pagina de AddEditContrato.
   */
  goAddEditForm(): void {
    this.router.navigate(['home/abmContrato']);
  }

  /**
   * Eliminar un Contrato.
   */
  deleteContrato() {
    this.error = false;
    this.modalConfirmOpen = true;
  }

  /**
   * Cuando se confirma la eliminación del contrato seleccionado.
   */
  confirmarEliminacion(): void {
    // TODO: ver si es una eliminación lógica o fisica.
    this.modalConfirmOpen = false;
    this.successMessage = 'Contrato eliminado exitosamente';
    this.success = true;
    this.getSuccessMessage();
  }

  getSuccessMessage() {
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

}
