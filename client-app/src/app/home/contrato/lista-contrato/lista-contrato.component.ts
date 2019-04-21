import {Component, OnInit} from '@angular/core';
import {Contrato} from "../../../domain/contrato";
import {Router} from "@angular/router";
import {ContratoService} from "../../../service/contrato.service";

@Component({
  selector: 'app-lista-contrato',
  templateUrl: './lista-contrato.component.html',
  styleUrls: ['./lista-contrato.component.css']
})
export class ListaContratoComponent implements OnInit {

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

  constructor(private router: Router,
              private contratoService: ContratoService) {
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
   * Cuando se presiona el botón Add.
   */
  goNewContratoForm(): void {
    this.router.navigate(['home/contratos/crear-contrato']);
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
    this.router.navigate(['home/contratos/editar-contrato/' + this.selectedContrato.id]);
  }

}
