import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Repuesto} from '../../../../domain/repuesto';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';

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


  // modal para agregar/editar repuestos
  modalAddEditRepuestoOpen = false;
  repuestoSeleccionado: Repuesto;
  isEditRepuesto: boolean;
  repuestos = new Array<Repuesto>();

  // error
  errorMessage: string;
  error: boolean;

  constructor(private router: Router,
              private location: Location,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.isEditRepuesto = false;
  }

  /**
   * Cuando se presiona el botón para crear un nuevo repuesto.
   */
  addNewRepuesto(): void {
    this.repuestoSeleccionado = null;
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Cuando se selecciona un repuesto para editar sus datos.
   */
  editRepuesto(): void {
    this.eliminarRepuesto(this.repuestoSeleccionado);
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
   * Cuando se selecciona un repuesto de la lista.
   * @param repuesto
   */
  selectRepuesto(repuesto: Repuesto): void {
    this.repuestoSeleccionado = repuesto;
    console.log('repuestoSeleccionado ', this.repuestoSeleccionado);
  }

  /**
   * El repuesto creado o editado es agregado a la lista de repuestos.
   * @param value
   */
  addEditRepuesto(value: Repuesto) {
    this.repuestos.push(value);
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
      this.repuestos.push(value);
    }
    this.modalAddEditRepuestoOpen = false;
  }

  /**
   * Se guarda la información de la solicitud de repuesto creada.
   */
  onSaveSolicitudRepuesto(): void {
    this.solicitudRepuesto = new SolicitudRepuesto(null, this.estado, this.repuestos, this.fechaSolicitud);
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
    // this.router.navigate(['home/mantenimiento/repuestos/lista-solicitud-repuestos']);
    this.location.back();
  }


}
