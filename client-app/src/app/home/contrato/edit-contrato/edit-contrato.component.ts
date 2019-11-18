import {Component, OnInit} from '@angular/core';
import {Contrato, EstadoContrato} from "../../../domain/contrato";
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ContratoService} from "../../../service/contrato.service";
import {EquipoService} from "../../../service/equipo.service";
import {RepresentanteService} from "../../../service/representante.service";
import {switchMap} from "rxjs/operators";


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
  estadoContrato: string;
  convocante: string;
  pdf: string;
  fechaInicio: any;
  fechaFin: any;

  // estado contrato
  estadoSeleccionado: EstadoContrato;
  estadosContrato: EstadoContrato[];


  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;
  isSelectedEquipo: boolean;

  // modal para agregar/editar representante
  modalAddEditRepreOpen = false;
  repreSeleccionado = new Representante(null, '', '', '', '', '',
    '');
  isEditRepre: boolean;
  representantes: Representante[];


  // error
  errorMessage: string;
  error: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contratoService: ContratoService,
              private equipoService: EquipoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.isEditRepre = true;
    this.isSelectedEquipo = false;
    this.getEquipos();
    this.getEstadoContratos();
    this.getAllRepresentantes();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.contratoService.getContratoById(+params.get('id')))
      ).subscribe(contrato => {
        this.contrato = new Contrato(contrato.id, contrato.numeroContrato, contrato.nombreLicitacion,
          contrato.tipoProcedimiento, contrato.estadoContrato, contrato.convocante, contrato.pdf, contrato.equipos,
          contrato.representante, contrato.fechaInicio, contrato.fechaFin);
        this.camposAEditar(this.contrato);
      },
      error => {
        this.errorMessage = error;
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
        this.errorMessage = error;
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
        this.errorMessage = error;
        this.estadosContrato = [];
      }
    );
  }

  /**
   * Se obtiene la lista de representantes.
   */
  getAllRepresentantes(): void {
    this.representanteService.getAllRepresentantes().subscribe(
      representantes => {
        this.representantes = representantes;
      },
      error => {
        this.errorMessage = error;
        this.representantes = [];
      }
    );
  }

  /**
   * Se establecen los campos a ser editados del contrato seleccionado.
   * @param contrato
   */
  camposAEditar(contrato: Contrato) {
    this.contratoId = contrato.id;
    this.numeroContrato = contrato.numeroContrato;
    this.nombreLicitacion = contrato.nombreLicitacion;
    this.tipoProcedimiento = contrato.tipoProcedimiento;
    this.estadoContrato = contrato.estadoContrato;
    this.convocante = contrato.convocante;
    this.pdf = contrato.pdf;
    this.fechaInicio = contrato.fechaInicio;
    this.fechaFin = contrato.fechaFin;
    this.repreSeleccionado = contrato.representante;
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
        this.errorMessage = error;
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
      if (this.selectedEquipo == this.equipos[i]) {
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
   * Se selecciona un representante de la lista.
   * @param value
   */
  onSelectedRepresentante(value: any): void {
    this.getRepresentanteById(+value);
  }

  /**
   * Se obtiene el representante seleccionado de la lista.
   * @param {number} id
   */
  getRepresentanteById(id: number): void {
    this.representanteService.getRepresentanteById(id).subscribe(
      representante => {
        this.repreSeleccionado = representante;
        this.isEditRepre = true;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Cuando se selecciona un representante para editar sus datos.
   */
  editRepresentante() {
    this.removeRepresentante();
    this.modalAddEditRepreOpen = true;
  }

  /**
   * El representante seleccionado para su edición, se elimina temporalmente de la lista de representantes.
   */
  removeRepresentante() {
    for (let i = 0; i < this.representantes.length; i++) {
      if (this.repreSeleccionado === this.representantes[i]) {
        this.representantes.splice(i, 1);
      }
    }
  }


  /**
   * El representante creado o editado es agregado a la lista de representantes.
   */
  addEditRepresentante(value: Representante) {
    this.representantes.push(value);
    this.repreSeleccionado = value;
    this.modalAddEditRepreOpen = false;
  }


  /**
   * Cuando se cancela la edición de un representante, el representante seleccionado se agrega de nuevo a la lista de
   * representantes.
   */
  onCancelAddEditRepresentante(value: Representante) {
    this.representantes = [];
    this.representanteService.getAllRepresentantes().subscribe(
      representantes => {
        this.representantes = representantes;
        this.representantes.push(value);
      },
      error => {
        this.errorMessage = error;
      }
    );
    this.modalAddEditRepreOpen = false;
  }


  /**
   * Se guarda la información del contrato creado o editado.
   */
  onSaveContrato(): void {
    this.contrato = new Contrato(this.contratoId, this.numeroContrato, this.nombreLicitacion, this.tipoProcedimiento,
      this.estadoContrato, this.convocante, this.pdf, this.selectedEquipos, this.repreSeleccionado, this.fechaInicio,
      this.fechaFin);
    this.saveContrato(this.contrato);

  }

  /**
   * Se crea un nuevo contrato.
   */
  saveContrato(contrato: Contrato): void {
    this.contratoService.editarContrato(contrato).subscribe(
      contrato => {
        this.contrato = contrato;
        this.goBack();
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/contratos/lista-contrato']);
  }

}
