import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {CONTRATOS, ESTADO_CONTRATO} from "../utils/mock-data/mock-data";
import {Contrato, EstadoContrato} from "../domain/contrato";

@Injectable()
export class ContratoService {

  private contratos = CONTRATOS;
  private estadosContrato = ESTADO_CONTRATO;

  // Observable Contrato sources
  private emitChangeSource = new BehaviorSubject<Contrato>(null);
  // Observable Contrato streams
  changeEmittedContrato = this.emitChangeSource.asObservable();

  // Observable boolean sources
  private emitChangeSourceEdit = new BehaviorSubject<boolean>(null);
  // Observable boolean streams
  changeEmittedEdit = this.emitChangeSourceEdit.asObservable();

  constructor() {
  }

  /**
   * Se obtienen todos los contratos.
   * @returns {Observable<Contrato[]>}
   */
  getContratos(): Observable<Contrato[]> {
    return Observable.of(this.contratos);
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   * @returns {Observable<EstadoContrato[]>}
   */
  getEstadosContrato(): Observable<EstadoContrato[]> {
    return Observable.of(this.estadosContrato);
  }


  /**
   * Se utiliza para notificar cuando un contrato es seleccionado para su edición.
   * @param {Contrato} contrato
   */
  emitChangeContrato(contrato: Contrato) {
    this.emitChangeSource.next(contrato);
  }

  /**
   * Notifica si es una edición.
   * @param {boolean} change
   */
  emitChangeEdit(change: boolean) {
    this.emitChangeSourceEdit.next(change);
  }

}
