import { Component, OnInit } from '@angular/core';
import {SolicitudRepuesto, SolicitudServicio} from "../../../../domain/solicitud";
import {SolicitudService} from "../../../../service/solicitud.service";

@Component({
  selector: 'app-add-orden-trabajo',
  templateUrl: './add-orden-trabajo.component.html',
  styleUrls: ['./add-orden-trabajo.component.css']
})
export class AddOrdenTrabajoComponent implements OnInit {

  // solicitud repuesto
  selectedSolicitudRepuesto: SolicitudRepuesto;

  // datagrid
  loading = true;
  total: number;
  solicitudServicios: SolicitudServicio[];
  solicitudRepuestos: SolicitudRepuesto[];
  selectedSolicitud: boolean;


  // form
  formtitle: string;
  isEdit: boolean;
  showFormAbmSolicitudRepuesto: boolean;

  // success actions
  successMessage: string;
  success: boolean;

  // Errors
  errorMessage: string;
  error: boolean;

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit() {
  }


  /**
   * Se obtiene la lista de las solicitudes de repuestos.
   */
  getSolicitudRepuesto(): void {
    // this.solicitudService.getSolicitudRepuestos().subscribe(
    //   repuestos => {
    //     this.solicitudRepuestos = repuestos;
    //     console.log(this.solicitudRepuestos);
    //     this.loading = false;
    //   },
    //   error => {
    //     this.errorMessage = error;
    //     this.solicitudRepuestos = null;
    //     this.loading = false;
    //   }
    // );
  }


  selectSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.selectedSolicitudRepuesto = solicitud;
    this.selectedSolicitud = true;
  }


  addSolicitudRepuesto(): void {
    this.selectedSolicitudRepuesto = new SolicitudRepuesto(null, '', null, '');
      this.formtitle = 'Crear Solicitud de Repuestos';

    this.showFormAbmSolicitudRepuesto = true;
    this.isEdit = false;
  }

  editSolicitudRepuesto(): void {
    this.formtitle = 'Editar Solicitud de Repuestos'
    this.isEdit = true;
    this.showFormAbmSolicitudRepuesto = true;
  }

}
