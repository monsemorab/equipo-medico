import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {Router} from "@angular/router";
import {RepuestoService} from "../../../../service/repuesto.service";

@Component({
  selector: 'app-lista-repuestos',
  templateUrl: './lista-repuestos.component.html',
  styleUrls: ['./lista-repuestos.component.css']
})
export class ListaRepuestosComponent implements OnInit {

  // repuesto
  repuestoSeleccionado: Repuesto;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  repuestos = new Array<Repuesto>();

  constructor(private router: Router,
              private repuestoService: RepuestoService) {
  }

  ngOnInit() {
    this.error = false;
    this.repuestoSeleccionado = null;
    this.getAllRepuestos();
  }

  /**
   * Obtener todos los respuestos de la BD
   */
  getAllRepuestos(): void {
    this.repuestoService.getAllRepuestos().subscribe(
      list => {
        this.repuestos = list;
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.loading = false;
      }
    );
  }

  /**
   * Cuando se presiona el botón Add.
   */
  goNewRepuestoForm(): void {
    this.router.navigate(['home/mantenimiento/repuestos/crear-repuesto']);
  }

  /**
   * Cuando se selecciona un repeusto de la lista.
   * @param repuesto
   */
  selectRepuesto(repuesto: Repuesto): void {
    if (this.repuestoSeleccionado != null && this.repuestoSeleccionado.id == repuesto.id) {
      this.repuestoSeleccionado = null;
    } else {
      this.repuestoSeleccionado = repuesto;
    }
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editRepuesto() {
    this.router.navigate(['home/mantenimiento/repuestos/editar-repuesto/' + this.repuestoSeleccionado.id]);
  }

}
