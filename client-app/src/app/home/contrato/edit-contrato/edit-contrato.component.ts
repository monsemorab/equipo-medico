import {Component, OnInit} from '@angular/core';
import {Contrato, EstadoContrato} from '../../../domain/contrato';
import {Equipo} from '../../../domain/equipo';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ContratoService} from '../../../service/contrato.service';
import {EquipoService} from '../../../service/equipo.service';
import {switchMap} from 'rxjs/operators';
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-edit-contrato',
  templateUrl: './edit-contrato.component.html',
  styleUrls: ['./edit-contrato.component.css']
})
export class EditContratoComponent implements OnInit {

  // contrato
  contrato: Contrato;
  contratoId: number;
  numeroContrato: number;
  nombreLicitacion: string;
  tipoProcedimiento: string;
  numeroProcedimiento: string;
  estadoContrato: string;
  convocante: string;
  pdf: string;
  fechaInicio: any;
  fechaFin: any;

  // estado contrato
  estadosContrato: EstadoContrato[];

  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;
  isSelectedEquipo: boolean;


  // error
  errorMessage: string;
  error: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contratoService: ContratoService,
              private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.isSelectedEquipo = false;
    this.getEquipos();
    this.getEstadoContratos();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.contratoService.getContratoById(+params.get('id')))
      ).subscribe(contrato => {
        this.contrato = new Contrato(contrato.id, contrato.numeroContrato, contrato.nombreLicitacion,
          contrato.tipoProcedimiento, contrato.numeroProcedimiento, contrato.estadoContrato, contrato.convocante,
          contrato.pdf, contrato.equipos, contrato.fechaInicio, contrato.fechaFin);
        this.camposAEditar(this.contrato);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      });
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
        console.log(this.errorMessage)
        this.equipos = [];
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
        console.log(this.errorMessage)
        this.estadosContrato = [];
      }
    );
  }


  /**
   * Se establecen los campos a ser editados del contrato seleccionado.
   * @param contrato
   */
  camposAEditar(contrato: Contrato) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.contratoId = contrato.id;
    this.numeroContrato = contrato.numeroContrato;
    this.nombreLicitacion = contrato.nombreLicitacion;
    this.tipoProcedimiento = contrato.tipoProcedimiento;
    this.numeroProcedimiento = contrato.numeroProcedimiento;
    this.estadoContrato = contrato.estadoContrato;
    this.convocante = contrato.convocante;
    this.pdf = contrato.pdf;
    this.fechaInicio = datepipe.transform(contrato.fechaInicio, 'dd-MM-yyyy');
    this.fechaFin = datepipe.transform(contrato.fechaFin, 'dd-MM-yyyy');
    this.selectedEquipos = contrato.equipos;
  }

  /**
   * Se selecciona un estado para el contrato.
   * @param {string} value
   */
  onSelectedEstadoContrado(value: string): void {
    this.estadoContrato = value;
  }

  /**
   * Se selecciona un equipo para el contrato.
   * @param {number} value
   */
  onSelectedEquipo(value: string): void {
    this.getEquipoById(+value);
  }

  /**
   * Se obtiene el equipo seleccionado por su Id.
   * @param {number} id
   */
  getEquipoById(id: number): void {
    this.equipoService.getEquipoById(id).subscribe(
      equipo => {
        this.selectedEquipo = equipo;
        this.equipoId = equipo.id;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
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
    this.equipoId = null;
    this.selectedEquipo = null;
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
  onDeleteEquipo() {
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
   * Se guarda la información del contrato creado o editado.
   */
  onSaveContrato(): void {

    if (typeof this.fechaInicio === 'string' || this.fechaInicio instanceof String) {
      let parts = this.fechaInicio.split('/');
      this.fechaInicio = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }

    if (typeof this.fechaFin === 'string' || this.fechaFin instanceof String) {
      let parts = this.fechaFin.split('/');
      this.fechaFin = new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.contrato = new Contrato(this.contratoId, this.numeroContrato, this.nombreLicitacion, this.tipoProcedimiento,
      this.numeroProcedimiento, this.estadoContrato, this.convocante, this.pdf, this.selectedEquipos, this.fechaInicio,
      this.fechaFin);
    this.saveContrato(this.contrato);

  }

  /**
   * Se crea un nuevo contrato.
   */
  saveContrato(contrato: Contrato): void {
    this.contratoService.editarContrato(contrato).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      contrato => {
        this.contrato = contrato;
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
    this.router.navigate(['home/contratos/lista-contrato']);
  }

}
