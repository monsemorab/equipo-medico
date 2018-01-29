import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {CONTRATOS, ESTADO_CONTRATO} from "../utils/mock-data/mock-data";
import {Contrato, EstadoContrato} from "../domain/contrato";

@Injectable()
export class ContratoService {

  private contratos = CONTRATOS;
  private estadosContrato = ESTADO_CONTRATO;

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

}
