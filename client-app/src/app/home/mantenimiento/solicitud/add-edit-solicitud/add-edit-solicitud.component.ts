import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SolicitudRepuesto, SolicitudServicio} from "../../../../domain/solicitud";
import {Representante} from "../../../../domain/representante";
import {SolicitudService} from "../../../../service/solicitud.service";

@Component({
  selector: 'app-add-edit-solicitud',
  templateUrl: './add-edit-solicitud.component.html',
  styleUrls: ['./add-edit-solicitud.component.css']
})
export class AddEditSolicitudComponent implements OnInit {

  @Input() solicitudRepuesto: SolicitudRepuesto;
  @Input() solicitudServicio: SolicitudServicio;
  @Input() tituloForm: string;
  @Input() isEdit: boolean;
  @Input() selectedSolicitudServicio: boolean;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();
  @Output() onCanceled: EventEmitter<any> = new EventEmitter();

  // form
  buttonTitle: string;

  // modal responsable
  modalResponsableOpen = false;
  modalTitle: string;
  responsable = new Representante(null, '', '', '', '');


  // modal repuestos
  modalRepuestosOpen = false;
  modalRepuestoTitle: string;
  repuesto = new Representante(null, '', '', '', '');
  repuestos = new Array();

  // error
  errorMessage: string;
  error: boolean

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit() {
  }

  addResponsables(): void {
    this.modalTitle = 'Agregar Responsable';
    if (this.isEdit) {
      this.responsable = this.solicitudServicio.responsable;
      this.modalTitle = 'Editar Responsable';
    }
    this.modalResponsableOpen = true;
  }

  onAddResponsable(): void {
    this.solicitudServicio.responsable = this.responsable;
    this.buttonTitle = 'Edit';
    this.modalResponsableOpen = false
  }

  /**
   * Se guarda la información de la solicitud creada o editada.
   */
  onSaveSolicitud(): void {
    console.log('onSaveSolicitud() ', this.solicitudServicio);
    this.onCloseAddEditSolicitud();
  }


  /**
   * Cuando la edición o la creación de una solicitud se finaliza.
   */
  onCloseAddEditSolicitud() {
    this.onFinished.emit(true);
  }

  /**
   * Cuando se cancela la edición o creación de una solicitud.
   */
  onCancelAddEditSolicitud() {
    this.onCanceled.emit(true);
  }

}
