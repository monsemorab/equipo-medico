import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Contrato, EstadoContrato} from "../../../domain/contrato";
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {ISubscription} from "rxjs-compat/Subscription";
import {EquipoService} from "../../../service/equipo.service";
import {ContratoService} from "../../../service/contrato.service";
import {RepresentanteService} from "../../../service/representante.service";

@Component({
  selector: 'app-add-contrato',
  templateUrl: './add-contrato.component.html',
  styleUrls: ['./add-contrato.component.css']
})
export class AddContratoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('contratoId') contratoIdElement: ElementRef;

  // contrato
  contratoId: number;
  numeroContrato: number;
  nombreLicitacion: string;
  tipoProcedimiento: string;
  estadoContrato: string;
  convocante: string;
  pdf: string;
  fechaInicio: any;
  fechaFin: any;

  contrato: Contrato;

  // estado contrato
  estadoSeleccionado: EstadoContrato;
  estadosContrato: EstadoContrato[];


  // equipo
  equipos: Equipo[];
  selectedEquipos = new Array<Equipo>();
  selectedEquipo: Equipo;
  equipoId: number;
  isSelectedEquipo: boolean;

  // modal representante
  modalRepreOpen = false;
  modalTitle: string;
  // repreSeleccionado= new Representante(null, '', '', '', '', '', '');
  repreSeleccionado: Representante;
  nombre: string;
  direccion: string;
  email: string;
  telefono: string;
  telefonoContacto: string;
  celular: string;
  representantes: Representante[];

  // form
  buttonTitle: string;

  // error
  errorMessage: string;
  error: boolean;

  // subscriptions
  private subscriptionSaveContrato: ISubscription;

  constructor(private contratoService: ContratoService,
              private equipoService: EquipoService,
              private representanteService: RepresentanteService) {

    this.isSelectedEquipo = false;
  }

  ngOnInit() {
    this.buttonTitle = 'Add';
    this.getEquipos();
    this.getEstadoContratos();
    this.getAllRepresentantes();
  }

  ngAfterViewInit() {
    this.contratoIdElement.nativeElement.focus();
  }

  ngOnDestroy() {
    if (this.subscriptionSaveContrato != null) {
      this.subscriptionSaveContrato.unsubscribe();
    }
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
        this.errorMessage = error,
          this.equipos = null;
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
        this.errorMessage = error,
          this.estadosContrato = null;
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
        this.error = true;
      }
    );
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
      if (this.selectedEquipo = this.equipos[i]) {
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
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se guarda la información del contrato creado o editado.
   */
  onSaveContrato(): void {
    this.contrato.equipos = this.selectedEquipos;
    this.saveContrato();

  }

  /**
   * Se crea un nuevo contrato.
   */
  saveContrato(): void {
    this.subscriptionSaveContrato = this.contratoService.crearContrato(this.contrato).subscribe(
      contrato => {
        this.contrato = contrato;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se actualizan los datos del contrato seleccionado.
   */
  editContrato(): void {
    this.subscriptionSaveContrato = this.contratoService.editarContrato(this.contrato).subscribe(
      contrato => {
        this.contrato = contrato;
      },
      error => {
        this.errorMessage = error;
        this.error = true;

      }
    );
  }

}
