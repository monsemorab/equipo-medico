import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

import {ESTADO_CONTRATO} from "../utils/mock-data/mock-data";
import {Contrato, EstadoContrato} from "../domain/contrato";
import {ApiRequestService} from "./api-request.service";
import {environment} from "../../environments/environment";

@Injectable()
export class ContratoService {

  private estadosContrato = ESTADO_CONTRATO;
  private urlContratos = environment.service_uri + '/contratos';

  constructor(private apiRequest: ApiRequestService) {}

  /**
   * TODO: crear endpoint para obtener esto
   * Se obtienen todos los contratos.
   * @returns {Observable<Contrato[]>}
   */
  getContratos(): Observable<Contrato[]> {
    return this.apiRequest.get(this.urlContratos);
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   * Esta lista no se obtiene de la BD, son datos predefinidos.
   * @returns {Observable<EstadoContrato[]>}
   */
  getEstadosContrato(): Observable<EstadoContrato[]> {
    return of(this.estadosContrato);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se crea un nuevo contrato.
   * @param {Contrato} contrato
   * @returns {Observable<Contrato>}
   */
  crearContrato(contrato: Contrato): Observable<Contrato> {
    const url = this.urlContratos;
    return this.apiRequest.post(url, contrato);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se actualiza un contrato existente.
   * @param {Contrato} contrato
   * @returns {Observable<Contrato>}
   */
  editarContrato(contrato: Contrato): Observable<Contrato> {
    const url = this.urlContratos + '/' + contrato.id;
    return this.apiRequest.put(url, contrato);
  }

}
