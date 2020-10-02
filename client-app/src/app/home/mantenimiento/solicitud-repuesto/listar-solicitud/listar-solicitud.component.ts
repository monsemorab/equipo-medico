import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  // solicitud Repuesto
  selectedRepuesto: SolicitudRepuesto;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  solicitudRepuestos: SolicitudRepuesto[];


  constructor(private router: Router,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.error = false;
    this.selectedRepuesto = null;
    this.getSolicitudRepuestos();
  }


  /**
   * Se obtiene la lista de todas las solicitudes de repuestos creadas.
   */
  getSolicitudRepuestos(): void {
    this.solicitudRepuestoService.getAllSolicitudRepuestos().subscribe(
      list => {
        this.solicitudRepuestos = list;
        this.formateoFechas();
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.solicitudRepuestos = [];
        this.loading = false;
      }
    );
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for(let i=0; i< this.solicitudRepuestos.length; i++){
      this.solicitudRepuestos[i].fechaSolicitud = datepipe.transform(this.solicitudRepuestos[i].fechaSolicitud, 'dd-MM-yyyy');
    }
    this.loading = false;
  }

  /**
   * Cuando se presiona el botón Add.
   */
  addSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/solicitud/crear-solicitud-repuesto']);
  }

  /**
   * Cuando se selecciona una solicitud de repuesto de la lista.
   * @param repuesto
   */
  selectSolicitudRepuesto(repuesto: SolicitudRepuesto): void {
    this.selectedRepuesto = repuesto;
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/solicitud/editar-solicitud-repuesto/' + this.selectedRepuesto.id]);
  }

}
