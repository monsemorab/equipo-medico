import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Repuesto} from '../../../../domain/repuesto';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RepuestoService} from '../../../../service/repuesto.service';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';

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
              private repuestoService: RepuestoService,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.isEditRepuesto = true;
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
        this.errorMessage = error;
        this.error = true;
      });
  }

  /**
   * Se establecen los campos a ser editados.
   * @param solicitud
   */
  camposAEditar(solicitud: SolicitudRepuesto) {
    this.id = solicitud.id;
    this.estado = solicitud.estado;
    this.repuestos = solicitud.repuestos;
    this.fechaSolicitud = solicitud.fechaSolicitud;
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
    this.removeRepuesto();
    this.modalAddEditRepuestoOpen = true;
  }

  /**
   * Se quita de la lista de repuestos existentes, el repuesto que se quiere  editar.
   */
  removeRepuesto(): void {
    for (let i = 0; i < this.repuestos.length; i++) {
      if (this.repuestoSeleccionado.id === this.repuestos[i].id) {
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
    this.repuestos = [];
    if (this.isEditRepuesto) {
      this.repuestoService.getAllRepuestos().subscribe(
        repuestos => {
          this.repuestos = repuestos;
          this.repuestos.push(value);
        },
        error => {
          this.errorMessage = error;
        }
      );
    }
    this.modalAddEditRepuestoOpen = false;
  }

  /**
   * Se guarda la información de la solicitud de repuesto creada.
   */
  onSaveSolicitudRepuesto(): void {
    this.solicitudRepuesto = new SolicitudRepuesto(this.id, this.estado, this.repuestos, this.fechaSolicitud);
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
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/mantenimiento/repuestos/lista-solicitud-repuestos']);
  }

}
