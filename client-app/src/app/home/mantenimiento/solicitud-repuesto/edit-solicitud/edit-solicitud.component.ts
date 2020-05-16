import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Repuesto} from '../../../../domain/repuesto';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {DatePipe} from "@angular/common";

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


  // modal para agregar/editar repuestos
  modalAddEditRepuestoOpen = false;
  repuestoSeleccionado: Repuesto;
  isEditRepuesto: boolean;
  repuestos = new Array<Repuesto>();

  // error
  errorMessage: string;
  error: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.solicitudRepuestoService.getSolicitudRepuestoById(+params.get('id')))
      ).subscribe(solicitud => {
        this.solicitudRepuesto = new SolicitudRepuesto(solicitud.id, solicitud.estado, solicitud.repuestos,
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
   * Se establecen los campos a ser editados.
   * @param solicitud
   */
  camposAEditar(solicitud: SolicitudRepuesto) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = solicitud.id;
    this.estado = solicitud.estado;
    this.repuestos = solicitud.repuestos;
    this.fechaSolicitud = datepipe.transform(solicitud.fechaSolicitud, 'dd-MM-yyyy');
  }

  /**
   * Cuando se presiona el botón para crear un nuevo repuesto.
   */
  addNewRepuesto(): void {
    this.repuestoSeleccionado = null;
    this.isEditRepuesto = false;
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Cuando se selecciona un repuesto para editar sus datos.
   * @param repuesto
   */
  editRepuesto(repuesto: Repuesto): void {
    this.repuestoSeleccionado = repuesto;
    this.eliminarRepuesto(this.repuestoSeleccionado);
    this.isEditRepuesto = true;
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Se quita de la lista de repuestos existentes, el repuesto que se quiere  editar.
   */
  eliminarRepuesto(repuestoSeleccionado: Repuesto): void {
    for (let i = 0; i < this.repuestos.length; i++) {
      if (repuestoSeleccionado.id === this.repuestos[i].id) {
        this.repuestos.splice(i, 1);
        break;
      }
    }
  }

  /**
   * El repuesto creado o editado es agregado a la lista de repuestos.
   * @param value
   */
  addEditRepuesto(value: Repuesto) {
    if(value != null) {
      this.repuestos.push(value);
    }
    this.repuestoSeleccionado = value;
    this.isEditRepuesto = true;
    this.modalAddEditRepuestoOpen = false;
  }

  /**
   * Cuando se cancela la edición de un repuesto, el repuesto seleccionado se agrega de nuevo a la lista de
   * repuestos.
   * @param value
   */
  onCancelAddEditRepuesto(value: Repuesto) {
    if (this.isEditRepuesto) {
      this.repuestos = this.solicitudRepuesto.repuestos;
      if(value != null) {
        this.repuestos.push(value);
      }
    }
    this.modalAddEditRepuestoOpen = false;
  }

  /**
   * Se guarda la información de la solicitud de repuesto creada.
   */
  onSaveSolicitudRepuesto(): void {
    if (typeof this.fechaSolicitud === 'string' || this.fechaSolicitud instanceof String) {
      let parts = this.fechaSolicitud.split('-');
      this.fechaSolicitud = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }
    this.solicitudRepuesto = new SolicitudRepuesto(this.id, this.estado, this.repuestos, this.fechaSolicitud);
    this.saveSolicitudRepuesto(this.solicitudRepuesto);
  }

  /**
   * Se crea una nueva solicitud de repuestos.
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
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/mantenimiento/repuestos/lista-solicitud-repuesto']);
  }

}
