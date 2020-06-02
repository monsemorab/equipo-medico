import { Component, OnInit } from '@angular/core';
import {OrdenTrabajo} from '../../../../domain/orden-trabajo';
import {Equipo} from '../../../../domain/equipo';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {Repuesto} from '../../../../domain/repuesto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OrdenTrabajoService} from '../../../../service/orden-trabajo.service';
import {switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";
import {Mantenimiento} from "../../../../domain/mantenimiento";

@Component({
  selector: 'app-atender-orden-trabajo',
  templateUrl: './atender-orden-trabajo.component.html',
  styleUrls: ['./atender-orden-trabajo.component.css']
})
export class AtenderOrdenTrabajoComponent implements OnInit {

  // orden trabajo
  ordenTrabajo: OrdenTrabajo;
  id: number;
  estado: string;
  tipoServicio: string;
  diagnostico: string;
  responsable: string;
  fechaRealizacion: any;
  equipos: Equipo [];
  solicitudRepuesto: SolicitudRepuesto;
  repuestos = new Array<Repuesto>();

  // mantenimiento
  tareaRealizada: string;
  informeNro: number;
  nombreTecnico: string;
  fechaMantenimiento: any;
  servicioRealizado: Mantenimiento;

  // Errors
  error: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ordenTrabajoService: OrdenTrabajoService) {
  }

  ngOnInit() {
    this.equipos = [];
    this.fechaMantenimiento = new Date();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.ordenTrabajoService.getOrdenTrabajoById(+params.get('id')))
      ).subscribe(orden => {
        this.ordenTrabajo = new OrdenTrabajo(orden.id, orden.estado, orden.tipoServicio, orden.mantenimiento,
          orden.diagnostico, orden.responsable, orden.equipos, orden.solicitudRepuesto, orden.fechaRealizacion);
        this.camposAEditar(this.ordenTrabajo);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      });
  }

  /**
   * Se establecen los campos a ser editados.
   * @param orden
   */
  camposAEditar(orden: OrdenTrabajo) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = orden.id;
    this.estado = orden.estado;
    this.tipoServicio = orden.tipoServicio;
    this.diagnostico = orden.diagnostico;
    this.responsable = orden.responsable;
    this.fechaRealizacion = datepipe.transform(orden.fechaRealizacion, 'dd-MM-yyyy').toString();
    this.equipos = orden.equipos;
    this.solicitudRepuesto = orden.solicitudRepuesto;
    if(this.solicitudRepuesto != null) {
      this.repuestos = this.solicitudRepuesto.repuestos;
    }
  }

  /**
   * Cuando se guarda la información introducida.
   */
  onSaveMantenimiento() {
    this.servicioRealizado = new Mantenimiento(null, this.tareaRealizada, this.informeNro, this.nombreTecnico, this.fechaMantenimiento);
    this.saveMantenimiento(this.servicioRealizado);
  }

  /**
   * Se guardan los datos del servicio realizado a la orden de trabajo.
   * @param servicioRealizado
   */
  saveMantenimiento(servicioRealizado: Mantenimiento) {
    // this.ordenTrabajoService.editarOrdenTrabajo(ordenTrabajo).subscribe(
    //   orden => {
    //     this.ordenTrabajo = orden;
    //     this.goBack();
    //   },
    //   error => {
    //     this.errorMessage = error.error;
    //     console.log(this.errorMessage)
    //     this.ordenTrabajo = null;
    //   }
    // );
  }

  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
  }
}

