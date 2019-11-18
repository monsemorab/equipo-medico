import {Component, OnInit} from '@angular/core';
import {SolicitudServicio} from "../../../../domain/solicitud";
import {SolicitudServicioService} from "../../../../service/solicitud-servicio.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-solicitud-servicio',
  templateUrl: './lista-solicitud-servicio.component.html',
  styleUrls: ['./lista-solicitud-servicio.component.css']
})
export class ListaSolicitudServicioComponent implements OnInit {

  // solicitud Servicio
  selectedSolServ: SolicitudServicio;

  // success actions
  successMessage: string;
  success: boolean;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  solicitudServicios: SolicitudServicio[];

  // orden de trabajo
  openOrdenTrabajo: boolean;

  constructor(private router: Router,
              private solicitudService: SolicitudServicioService) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.selectedSolServ = null;
    this.getSolicitudServicios();
  }


  /**
   * Se obtiene la lista de todas las solicitudes de servicios creadas.
   */
  getSolicitudServicios(): void {
    this.solicitudService.getAllSolicitudServicios().subscribe(
      list => {
        this.solicitudServicios = list;
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.solicitudServicios = [];
        this.loading = false;
      }
    );
  }

  /**
   * Cuando se presiona el botón Add.
   */
  addSolicitudServicio() {
    this.router.navigate(['home/mantenimiento/solicitud/crear-solicitud-servicio']);
  }

  /**
   * Cuando se selecciona una solicitud de servicio de la lista.
   * @param servicio
   */
  selectSolicitudServicio(servicio: SolicitudServicio): void {
    this.selectedSolServ = servicio;
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editSolicitudServicio() {
    this.router.navigate(['home/mantenimiento/solicitud/editar-solicitud-servicio' +
    this.selectedSolServ.id]);
  }

  /**
   * Para generar una orden de trabajo sobre la solicitud de servicio seleccionada.
   */
  atenderSolicitud(): void {
    console.log(this.selectedSolServ);
    this.openOrdenTrabajo = true;
  }

  onCancelOrSaveOrderTrabajo(value: boolean) {
    this.openOrdenTrabajo = !value;
    this.getSolicitudServicios();
  }

}
