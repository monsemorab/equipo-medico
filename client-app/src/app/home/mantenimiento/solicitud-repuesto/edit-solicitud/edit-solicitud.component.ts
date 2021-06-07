import {Component, OnInit} from '@angular/core';
import {EstadoSolicitud, SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {DatePipe} from "@angular/common";
import {SolicitudRepuestoDetalle} from "../../../../domain/solicitud-repuesto-detalle";

@Component({
  selector: 'app-edit-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.css']
})
export class EditSolicitudComponent implements OnInit {

// Datos solicitud repuesto.
  solicitudRepuesto: SolicitudRepuesto;
  id: number;
  estado: string;
  fechaSolicitud: any;
  // estado solicitud
  estados: EstadoSolicitud[];

  // modal para agregar/editar detalle de repuesto a la solicitud
  modalAddEditDetalleOpen = false;
  detalleSeleccionado: SolicitudRepuestoDetalle;
  isEditDetalle: boolean;
  solicitudRepuestoDetalles = new Array<SolicitudRepuestoDetalle>();

  // error
  errorMessage: string;
  error: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.getEstadosEditSolicitud();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.solicitudRepuestoService.getSolicitudRepuestoById(+params.get('id')))
      ).subscribe(solicitud => {
        this.solicitudRepuesto = new SolicitudRepuesto(solicitud.id, solicitud.estado, solicitud.solicitudRepuestoDetalles,
          solicitud.fechaSolicitud);
        this.camposAEditar(this.solicitudRepuesto);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      });
  }

  /**
   * Se obtiene la lista de los estados para editar una solicitud.
   */
  getEstadosEditSolicitud(): void {
    this.solicitudRepuestoService.getEstadosEditSolicitud().subscribe(
        estados => {
          this.estados = estados;
        },
        error => {
          this.errorMessage = error.error;
          console.log(this.errorMessage)
          this.estados = [];
        }
    );
  }

  /**
   * Se selecciona un estado para la solicitud.
   * @param {string} value
   */
  onSelectedEstadoSolicitud(value: string): void {
    this.estado = value;
  }

  /**
   * Se establecen los campos a ser editados.
   * @param solicitud
   */
  camposAEditar(solicitud: SolicitudRepuesto) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = solicitud.id;
    this.estado = solicitud.estado;
    this.solicitudRepuestoDetalles = solicitud.solicitudRepuestoDetalles;
    this.fechaSolicitud = datepipe.transform(solicitud.fechaSolicitud, 'yyyy-MM-dd');
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
      const parts = this.fechaSolicitud.split('-');
      this.fechaSolicitud = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }

    this.solicitudRepuesto = new SolicitudRepuesto(this.id, this.estado, this.solicitudRepuestoDetalles, this.fechaSolicitud);
    this.saveSolicitudRepuesto(this.solicitudRepuesto);
  }

  /**
   * Se editan los datos de la solicitud de repuestos seleccionada.
   * @param solicitud
   */
  saveSolicitudRepuesto(solicitud: SolicitudRepuesto): void {
    this.solicitudRepuestoService.editarSolicitudRepuesto(solicitud).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      solicitud => {
        this.solicitudRepuesto = solicitud;
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(error.error + error.message)
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/mantenimiento/solicitud/lista-solicitud-repuesto']);
  }

}
