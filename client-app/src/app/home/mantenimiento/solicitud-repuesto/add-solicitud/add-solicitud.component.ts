import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {SolicitudRepuestoDetalle} from "../../../../domain/solicitud-repuesto-detalle";

@Component({
  selector: 'app-add-solicitud',
  templateUrl: './add-solicitud.component.html',
  styleUrls: ['./add-solicitud.component.css']
})
export class AddSolicitudComponent implements OnInit {

  // Datos solicitud repuesto.
  solicitudRepuesto: SolicitudRepuesto;
  estado: string;
  fechaSolicitud: any;


  // modal para agregar/editar detalle de repuesto a la solicitud
  modalAddEditDetalleOpen = false;
  detalleSeleccionado: SolicitudRepuestoDetalle;
  isEditDetalle: boolean;
  solicitudRepuestoDetalles = new Array<SolicitudRepuestoDetalle>();

  // error
  errorMessage: string;
  error: boolean;

  constructor(private router: Router,
              private location: Location,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.estado = "Pendiente";
  }

  /**
   * Cuando se presiona el botón para crear un nuevo repuesto.
   */
  addNewRepuesto(): void {
    this.isEditDetalle = false;
    this.detalleSeleccionado = null;
    this.modalAddEditDetalleOpen = true;
  }

  /**
   * Cuando se selecciona un repuesto para editar sus datos.
   * @param repuesto
   */
  editRepuesto(repuesto: SolicitudRepuestoDetalle): void {
    this.detalleSeleccionado = repuesto;
    this.isEditDetalle = true;
    this.eliminarDetalleRepuesto(this.detalleSeleccionado);
    this.modalAddEditDetalleOpen = true;
  }

  /**
   * Se quita de la lista de detalles el repuesto que se quiere  editar.
   */
  eliminarDetalleRepuesto(repuestoSeleccionado: SolicitudRepuestoDetalle): void {
    for (let i = 0; i < this.solicitudRepuestoDetalles.length; i++) {
      if (repuestoSeleccionado.id === this.solicitudRepuestoDetalles[i].id) {
        this.solicitudRepuestoDetalles.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Cuando el control es devuelto a la pantalla principal.
   * @param value
   */
  closeRepuestoModal(value: SolicitudRepuestoDetalle) {
    if(value != null) {
      this.solicitudRepuestoDetalles.push(value);
    }
    this.modalAddEditDetalleOpen = false;
  }

  /**
   * Se guarda la información de la solicitud de repuesto creada.
   */
  onSaveSolicitudRepuesto(): void {
    if (typeof this.fechaSolicitud === 'string' || this.fechaSolicitud instanceof String) {
      let parts = this.fechaSolicitud.split('/');
      this.fechaSolicitud = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.solicitudRepuesto = new SolicitudRepuesto(null, this.estado, this.solicitudRepuestoDetalles, this.fechaSolicitud);
    this.saveSolicitudRepuesto(this.solicitudRepuesto);
  }

  /**
   * Se crea una nueva solicitud de repuestos.
   * @param solicitud
   */
  saveSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.solicitudRepuestoService.crearSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
        this.solicitudRepuestoService.emitExisteSolicitudRepuesto(true);
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/mantenimiento/solicitud/lista-solicitud-repuesto']);
  }


}
