import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrdenTrabajo} from '../../../../domain/orden-trabajo';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lista-orden-trabajo',
  templateUrl: './lista-orden-trabajo.component.html',
  styleUrls: ['./lista-orden-trabajo.component.css']
})
export class ListaOrdenTrabajoComponent implements OnInit {

  // orden trabajo
  SelectedOrdenTrabajo: OrdenTrabajo;

  // success actions
  successMessage: string;
  success: boolean;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  ordenTrabajoList: OrdenTrabajo[];

  constructor(private router: Router,
              private ordenTrabajoService: OrdenTrabajoService) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.SelectedOrdenTrabajo = null;
    this.getAllOrdenTrabajo();
  }


  /**
   * Se obtiene la lista de todas las ordenes de trabajo realizadas.
   */
  getAllOrdenTrabajo(): void {
    this.ordenTrabajoService.getAllOrdenTrabajo().subscribe(
      list => {
        this.ordenTrabajoList = list;
        this.formateoFechas();
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajoList = [];
        this.loading = false;
      }
    );
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for(let i=0; i< this.ordenTrabajoList.length; i++){
      if(this.ordenTrabajoList[i].fechaArealizarse != null){
        this.ordenTrabajoList[i].fechaArealizarse = datepipe.transform(this.ordenTrabajoList[i].fechaArealizarse, 'dd-MM-yyyy');
      }
    }
    this.loading = false;
  }

  /**
   * Cuando se presiona el botón Add.
   */
  crearOrdenTrabajo() {
    this.router.navigate(['home/mantenimiento/orden-trabajo/crear-orden-trabajo']);
  }

  /**
   * Cuando se selecciona una orden de trabajo de la lista.
   * @param orden
   */
  selectOrdenTrabajo(orden: OrdenTrabajo): void {
    this.SelectedOrdenTrabajo = orden;
  }

  /**
   * Editar una orden de trabajo creada.
   */
  editarOrdenTrabajo() {
    this.router.navigate(['home/mantenimiento/orden-trabajo/editar-orden-trabajo/' +
    this.SelectedOrdenTrabajo.id]);
  }

  /**
   * Atender una orden de trabajo creada.
   */
  atenderOrdenTrabajo(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/atender-orden-trabajo/' +
    this.SelectedOrdenTrabajo.id]);
  }

}
