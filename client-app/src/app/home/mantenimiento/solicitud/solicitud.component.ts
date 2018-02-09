import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SolicitudRepuesto, SolicitudServicio} from "../../../domain/solicitud";
import {SolicitudService} from "../../../service/solicitud.service";

@Component({
  selector: 'app-solicitud',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  // solicitud Servicio
  selectedSolicitudServicio: SolicitudServicio;
  isSolicitudServicio = true;

  // solicitud repuesto
  selectedSolicitudRepuesto: SolicitudRepuesto;

  // form
  formtitle: string;
  isEdit: boolean;
  showFormAbmSolicitud: boolean;
  modalTipoSolicitudOpen: boolean;
  selectedSolicitud: boolean;
  tipoSolicitud: string;
  showSolicitudServicio: boolean;

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
  solicitudServicios: SolicitudServicio[];
  solicitudRepuestos: SolicitudRepuesto[];

  constructor(private solicitudService: SolicitudService) {

  }

  ngOnInit() {
    this.isEdit = false;
    this.showFormAbmSolicitud = false;
    this.modalTipoSolicitudOpen = false;
    this.selectedSolicitud = false;

    /**
     * Se muestra por defecto la lista de solicitudes de servicios.
     */
    this.seleccionarTipoSolicitud('servicio');
    // this.tipoSolicitud ='servicio';
    // this.showSolicitudServicio = true;
    // this.getSolicitudServicio();
  }

  /**
   * Se selecciona el tipo de solicitud que se listara.
   * @param {string} tipoSolicitud
   */
  seleccionarTipoSolicitud(tipoSolicitud: string): void {
    this.tipoSolicitud = tipoSolicitud;
    if (this.tipoSolicitud == 'servicio') {
      this.isSolicitudServicio = true;
      this.showSolicitudServicio = true;
      this.getSolicitudServicio();
    } else {
      this.isSolicitudServicio = false;
      this.showSolicitudServicio = false;
      this.getSolicitudRepuesto();
    }
  }

  /**
   * Se obtiene la lista de las solicitudes de servicios.
   */
  getSolicitudServicio(): void {
    this.solicitudService.getSolicitudServicios().subscribe(
      servicios => {
        this.solicitudServicios = servicios;
        console.log(this.solicitudServicios);
        this.loading = false;
      },
      error => {
        this.errorMessage = error;
        this.solicitudServicios = null;
        this.loading = false;
      }
    );
  }

  /**
   * Se obtiene la lista de las solicitudes de repuestos.
   */
  getSolicitudRepuesto(): void {
    this.solicitudService.getSolicitudRepuestos().subscribe(
      repuestos => {
        this.solicitudRepuestos = repuestos;
        console.log(this.solicitudRepuestos);
        this.loading = false;
      },
      error => {
        this.errorMessage = error;
        this.solicitudRepuestos = null;
        this.loading = false;
      }
    );
  }

  selectTipoRespuesto(): void {
    this.isSolicitudServicio = false;
  }

  selectSolicitudServicio(solicitud: SolicitudServicio): void {
    this.selectedSolicitudServicio = solicitud;
    this.selectedSolicitud = true;
  }

  selectSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.selectedSolicitudRepuesto = solicitud;
    this.selectedSolicitud = true;
  }

  openTipoSolicitudForm(): void {
    this.modalTipoSolicitudOpen = true;
  }

  addSolicitud(): void {
    if (this.isSolicitudServicio) {
      this.selectedSolicitudServicio = new SolicitudServicio(null, '', '',
        null, '');
      this.formtitle = 'Crear Solicitud de Servicio';
    } else {
      this.selectedSolicitudRepuesto = new SolicitudRepuesto(null, '', null, '');
      this.formtitle = 'Crear Solicitud de Repuestos';
    }
    this.modalTipoSolicitudOpen = false;
    this.showFormAbmSolicitud = true;
    this.isEdit = false;
  }

  editSolicitud(): void {
    if (this.isSolicitudServicio) {
      this.formtitle = 'Editar Solicitud de Servicio';
    } else {
      this.formtitle = 'Editar Solicitud de Repuestos';
    }
    this.isEdit = true;
    this.showFormAbmSolicitud = true;
  }

  deleteSolicitud(): void {
    //
  }


  /**
   * Respuesta recibida por el hijo al terminar una creación o editión de una solicitud.
   * @param {boolean} value
   */
  onCloseAddEditSolicitud(value: boolean) {
    this.showFormAbmSolicitud = !value;
    this.selectedSolicitud = false;

    if (this.isSolicitudServicio) {
      this.tipoSolicitud = 'servicio';
      this.selectedSolicitudServicio = null;
      this.getSolicitudServicio();
    } else {
      this.tipoSolicitud = 'repuestos';
      this.selectedSolicitudRepuesto = null;
      this.getSolicitudRepuesto();
    }

    this.successMessage = 'Solicitud creada con éxito';
    if (this.isEdit) {
      this.successMessage = 'Solicitud modificada con éxito';
    }
    this.getSuccessMessage();
  }

  /**
   * Muestra los mensajes de éxitos por un tiempo determinado.
   */
  getSuccessMessage() {
    this.success = true;
    this.isEdit = false;
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  /**
   * Respuesta recibida desde el hijo cuando se cancela la edición o creación de una nueva solicitud.
   * @param {boolean} value
   */
  onCancelAddEditSolicitud(value: boolean) {
    this.showFormAbmSolicitud = !value;
    this.isEdit = false;
    this.selectedSolicitud = false;

    if (this.isSolicitudServicio) {
      this.tipoSolicitud = 'servicio';
      this.selectedSolicitudServicio = null;
      this.getSolicitudServicio();
    } else {
      this.tipoSolicitud = 'repuestos';
      this.selectedSolicitudRepuesto = null;
      this.getSolicitudRepuesto();
    }
  }

}
