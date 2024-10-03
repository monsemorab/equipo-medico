import {Component, OnInit} from '@angular/core';
import {Contrato, EstadoContrato, TipoContrato} from '../../../domain/contrato';
import {Equipo} from '../../../domain/equipo';
import {EquipoService} from '../../../service/equipo.service';
import {ContratoService} from '../../../service/contrato.service';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {Repuesto} from "../../../domain/repuesto";
import {RepuestoService} from "../../../service/repuesto.service";

@Component({
  selector: 'app-add-contrato',
  templateUrl: './add-contrato.component.html',
  styleUrls: ['./add-contrato.component.css']
})
export class AddContratoComponent implements OnInit {

  // contrato
  contrato: Contrato;
  contratoId: number;
  numeroContrato: number;
  tipoContrato: string;
  nombreLicitacion: string;
  tipoProcedimiento: string;
  numeroProcedimiento: string;
  estadoContrato: string;
  convocante: string;
  fechaInicio: any;
  fechaFin: any;

  // estado contrato
  estadosContrato: EstadoContrato[];

  // tipos contrato
  tiposContrato: TipoContrato[];
  isTipoMantenimiento: boolean;

  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: any;
  isSelectedEquipo: boolean;

  // repuesto
  repuestos: Repuesto[];
  selectedRepuestos = new Array<Repuesto>();
  selectedRepuesto: Repuesto;
  repuestoId: any;
  isSelectedRepuesto: boolean;

  // error
  errorMessage: string;
  error: boolean;


  constructor(private router: Router,
              private contratoService: ContratoService,
              private equipoService: EquipoService,
              private repuestoService: RepuestoService) {
  }

  ngOnInit() {
    this.isSelectedEquipo = false;
    this.isSelectedRepuesto = false;
    this.estadoContrato = 'Vigente';
    this.tipoContrato = 'DE ADQUISICION';
    this.isTipoMantenimiento = false;
    this.equipoId = 'Seleccionar Equipo';
    this.repuestoId = 'Seleccionar Repuesto';
    this.getEquipos();
    this.getAllRepuestos();
    this.getEstadoContratos();
    this.getTiposContratos();
  }


  /**
   * Se obtiene la lista de todos los equipos que esten sin contrato.
   */
  getEquipos(): void {
    this.equipoService.getEquiposSinContratos().subscribe(
      equipos => {
        this.equipos = equipos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.equipos = [];
      }
    );
  }

  getAllRepuestos(): void {
    this.repuestoService.getAllRepuestos().subscribe(
      list => {
        this.repuestos = list;
      },
      error => {
        this.errorMessage = error.error;
        this.repuestos = [];
      }
    );
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   */
  getEstadoContratos(): void {
    this.contratoService.getEstadosContrato().subscribe(
      estados => {
        this.estadosContrato = estados;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.estadosContrato = [];
      }
    );
  }

  /**
   * Se obtiene la lista de los tipos para un contrato.
   */
  getTiposContratos(): void {
    this.contratoService.getTiposContratos().subscribe(
      tipos => {
        this.tiposContrato = tipos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.tiposContrato = [];
      }
    );
  }

  onSelectTipoContrato(): void {
    if (this.tipoContrato === 'MANTENIMIENTO') {
      this.isTipoMantenimiento = true;
    } else {
      this.isTipoMantenimiento = false;
    }
  }


  /**
   * Se selecciona un equipo para el contrato.
   */
  onSelectedEquipo(): void {
    this.getEquipoById(+this.equipoId);
  }

  /**
   * Se obtiene el equipo seleccionado por su Id.
   * @param {number} id
   */
  getEquipoById(id: number): void {
    this.equipoService.getEquipoById(id).subscribe(
      equipo => {
        this.selectedEquipo = equipo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.selectedEquipo = null;
      }
    );
  }

  /**
   * Se agrega el equipo seleccionado a una lista de equipos para el contrato.
   */
  addEquipo(): void {
    this.selectedEquipos.push(this.selectedEquipo);
    for (let i = 0; i < this.equipos.length; i++) {
      if (this.selectedEquipo === this.equipos[i]) {
        this.equipos.splice(i, 1);
      }
    }
    this.formateoFechas();
    this.equipoId = null;
    this.selectedEquipo = null;
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for (let i = 0; i < this.selectedEquipos.length; i++) {
      this.selectedEquipos[i].fechaCompra = datepipe.transform(this.selectedEquipos[i].fechaCompra, 'dd-MM-yyyy');
    }
  }

  /**
   * Cuando se selecciona un equipo de la lista de equipos agregados.
   * @param {Equipo} equipo
   */
  onSelectEquipo(equipo: Equipo): void {
    this.selectedEquipo = equipo;
    this.isSelectedEquipo = true;
  }

  /**
   * Se elimina el equipo seleccionado de la lista de equipos agregados.
   */
  onDeleteEquipo(): void {
    for (let i = 0; i < this.selectedEquipos.length; i++) {
      if (this.selectedEquipos[i] === this.selectedEquipo) {
        this.selectedEquipos.splice(i, 1);
        this.equipos.push(this.selectedEquipo);
        this.isSelectedEquipo = false;
        this.selectedEquipo = null;
        break;
      }
    }
  }

  /**
   * Se selecciona un repuesto.
   */
  onSelectedRepuesto(): void {
    this.getRepuestoById(+this.repuestoId);
  }

  /**
   * Se obtiene el repuesto seleccionado por su Id.
   * @param {number} id
   */
  getRepuestoById(id: number): void {
    this.repuestoService.getRepuestoById(id).subscribe(
      repuesto => {
        this.selectedRepuesto = repuesto;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.selectedRepuesto = null;
      }
    );
  }

  /**
   * Se agrega el repuesto seleccionado a una lista de repuestos para el contrato de tipo mantenimiento.
   */
  addRepuesto(): void {
    this.selectedRepuestos.push(this.selectedRepuesto);
    for (let i = 0; i < this.repuestos.length; i++) {
      if (this.selectedRepuesto === this.repuestos[i]) {
        this.repuestos.splice(i, 1);
      }
    }
    this.formateoFechasRepuesto();
    this.repuestoId = null;
    this.selectedRepuesto = null;
  }

  formateoFechasRepuesto() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for (let i = 0; i < this.selectedRepuestos.length; i++) {
      this.selectedRepuestos[i].fechaActualizacion = datepipe.transform(this.selectedRepuestos[i].fechaActualizacion, 'dd-MM-yyyy');
    }
  }

  /**
   * Cuando se selecciona un repuesto de la lista de repuestos agregados.
   * @param {Repuesto} repuesto
   */
  onSelectRepuesto(repuesto: Repuesto): void {
    this.selectedRepuesto= repuesto;
    this.isSelectedRepuesto = true;
  }

  /**
   * Se elimina el repuesto seleccionado de la lista de repuestos agregados.
   */
  onDeleteRepuesto(): void {
    for (let i = 0; i < this.selectedRepuestos.length; i++) {
      if (this.selectedRepuestos[i] === this.selectedRepuesto) {
        this.selectedRepuestos.splice(i, 1);
        this.repuestos.push(this.selectedRepuesto);
        this.isSelectedRepuesto = false;
        this.selectedRepuesto = null;
        break;
      }
    }
  }


  /**
   * Se guarda la información del contrato creado o editado.
   */
  onSaveContrato(): void {
    let today = new Date();
    if (typeof this.fechaInicio === 'string' || this.fechaInicio instanceof String) {
      const parts = this.fechaInicio.split('-');
      this.fechaInicio = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }

    if (typeof this.fechaFin === 'string' || this.fechaFin instanceof String) {
      const parts = this.fechaFin.split('-');
      this.fechaFin = new Date(+parts[0], +parts[1] - 1, +parts[2]);

      // Al agregar la fecha de finalización se debe cambiar el estado a Finalizado si la fecha ya pasó.
      if (today > this.fechaFin) {
        this.estadoContrato = 'Finalizado';
      }
    }

    if(this.selectedEquipos != null){
      for (let i = 0; i < this.selectedEquipos.length; i++) {
        if (typeof this.selectedEquipos[i].fechaCompra == 'string' || this.selectedEquipos[i].fechaCompra instanceof String) {
          const parts = this.selectedEquipos[i].fechaCompra.split('-');
          this.selectedEquipos[i].fechaCompra = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        }
      }
    }

    if(this.selectedRepuestos != null){
      for (let i = 0; i < this.selectedRepuestos.length; i++) {
        if (typeof this.selectedRepuestos[i].fechaActualizacion == 'string' || this.selectedRepuestos[i].fechaActualizacion instanceof String) {
          const parts = this.selectedRepuestos[i].fechaActualizacion.split('-');
          this.selectedRepuestos[i].fechaActualizacion = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        }
      }
    }

    this.contrato = new Contrato(this.contratoId, this.numeroContrato, this.nombreLicitacion,
      this.tipoContrato, this.tipoProcedimiento, this.numeroProcedimiento, this.estadoContrato, this.convocante,
      this.selectedEquipos, this.selectedRepuestos, this.fechaInicio, this.fechaFin);
    this.saveContrato(this.contrato);

  }

  /**
   * Se crea un nuevo contrato.
   */
  saveContrato(contrato: Contrato): void {
    this.contratoService.crearContrato(contrato).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      contrato => {
        this.contrato = contrato;
        this.contratoService.emitExisteListaContratos(true);
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/contratos/lista-contrato']);
  }

}
