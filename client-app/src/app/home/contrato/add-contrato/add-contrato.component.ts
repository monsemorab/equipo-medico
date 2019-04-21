import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contrato, EstadoContrato} from "../../../domain/contrato";
import {Equipo} from "../../../domain/equipo";
import {Representante} from "../../../domain/representante";
import {ISubscription} from "rxjs-compat/Subscription";
import {EquipoService} from "../../../service/equipo.service";
import {ContratoService} from "../../../service/contrato.service";
import {RepresentanteService} from "../../../service/representante.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-contrato',
    templateUrl: './add-contrato.component.html',
    styleUrls: ['./add-contrato.component.css']
})
export class AddContratoComponent implements OnInit, OnDestroy {

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
    repreSeleccionado: Representante;
    isEditRepre: boolean;
    representantes = new Array<Representante>();

    // error
    errorMessage: string;
    error: boolean;

    // subscriptions
    private subscriptionGetAllRepresentantes: ISubscription;
    private subscriptionSaveContrato: ISubscription;

    constructor(private router: Router,
                private contratoService: ContratoService,
                private equipoService: EquipoService,
                private representanteService: RepresentanteService) {
    }

    ngOnInit() {
        this.isEditRepre = false;
        this.isSelectedEquipo = false;
        this.getEquipos();
        this.getEstadoContratos();
        this.getAllRepresentantes();
    }

    ngOnDestroy() {
        if (this.subscriptionGetAllRepresentantes != null) {
            this.subscriptionGetAllRepresentantes.unsubscribe();
        }
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
        this.subscriptionGetAllRepresentantes = this.representanteService.getAllRepresentantes().subscribe(
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
     * Se selecciona un estado para el contrato.
     * @param value
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
     * Se selecciona un representante de la lista.
     * @param value
     */
    onSelectedRepresentante(value: any): void {
        for (let i = 0; i < this.representantes.length; i++) {
            if (+value === this.representantes[i].id) {
                this.repreSeleccionado = this.representantes[i];
                this.isEditRepre = true;
                break;
            }
        }
    }

    /**
     * Cuando se quiere crear un nuevo representante.
     */
    addNewRepresentante(): void {
        this.repreSeleccionado = null;
        this.modalAddEditRepreOpen = true;
    }

    /**
     * Cuando se selecciona un representante para editar sus datos.
     */
    editRepresentante(): void {
        this.removeRepresentante();
        this.modalAddEditRepreOpen = true;
    }

    /**
     * El representante seleccionado para su edición, se elimina temporalmente de la lista de representantes.
     */
    removeRepresentante(): void {
        for (let i = 0; i < this.representantes.length; i++) {
            if (this.repreSeleccionado === this.representantes[i]) {
                this.representantes.splice(i, 1);
            }
        }
    }


    /**
     * El representante creado o editado es agregado a la lista de representantes.
     */
    addEditRepresentante(value: Representante): void {
        this.representantes.push(value);
        this.repreSeleccionado = value;
        this.isEditRepre = true;
        this.modalAddEditRepreOpen = false;
    }


    /**
     * Cuando se cancela la edición de un representante, el representante seleccionado se agrega de nuevo a la lista de
     * representantes.
     */
    onCancelAddEditRepresentante(value: Representante): void {
        this.representantes = [];
        if (this.isEditRepre) {
            this.subscriptionGetAllRepresentantes = this.representanteService.getAllRepresentantes().subscribe(
                representantes => {
                    this.representantes = representantes;
                    this.representantes.push(value);
                },
                error => {
                    this.errorMessage = error;
                }
            );
        }
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
        this.subscriptionSaveContrato = this.contratoService.crearContrato(contrato).subscribe(
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
