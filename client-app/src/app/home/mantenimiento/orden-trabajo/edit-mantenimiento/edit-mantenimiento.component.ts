import { Component, OnInit } from '@angular/core';
import {OrdenTrabajo} from "../../../../domain/orden-trabajo";
import {Equipo} from "../../../../domain/equipo";
import {SolicitudRepuesto} from "../../../../domain/solicitud-repuesto";
import {Repuesto} from "../../../../domain/repuesto";
import {Mantenimiento} from "../../../../domain/mantenimiento";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {OrdenTrabajoService} from "../../../../service/orden-trabajo.service";
import {switchMap} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {ManteniminetoService} from "../../../../service/mantenimineto.service";

@Component({
  selector: 'app-edit-mantenimiento',
  templateUrl: './edit-mantenimiento.component.html',
  styleUrls: ['./edit-mantenimiento.component.css']
})
export class EditMantenimientoComponent implements OnInit {

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
  mantenimientoId: number;
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
              private ordenTrabajoService: OrdenTrabajoService,
              private manteniminetoService: ManteniminetoService) {
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
    this.servicioRealizado = orden.mantenimiento;
    this.mantenimientoId = this.servicioRealizado.id;
    this.tareaRealizada = this.servicioRealizado.tareaRealizada;
    this.informeNro = this.servicioRealizado.informeNro;
    this.nombreTecnico = this.servicioRealizado.nombreTecnico;
  }

  /**
   * Cuando se guarda la información introducida.
   */
  onSaveMantenimiento() {
    this.servicioRealizado = new Mantenimiento(this.mantenimientoId, this.tareaRealizada, this.informeNro, this.nombreTecnico, this.fechaMantenimiento);
    this.updateMantenimiento(this.servicioRealizado);
  }

  /**
   * Se guardan los datos modificados del servicio realizado a la orden de trabajo.
   * @param servicioRealizado
   */
  updateMantenimiento(servicioRealizado: Mantenimiento) {
    this.manteniminetoService.editarMantenimineto(servicioRealizado).subscribe(
      mantenimineto => {
        this.servicioRealizado = mantenimineto;
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.ordenTrabajo = null;
      }
    );
  }

  /**
   * Cuando se presiona sobre el botón cancelar, regresa a la página del listado.
   */
  goBack(): void {
    this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo-finalizadas']);
  }
}
