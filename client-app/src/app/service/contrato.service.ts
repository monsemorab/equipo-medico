import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {ESTADO_CONTRATO} from '../utils/mock-data/constantes';
import {Contrato, EstadoContrato} from '../domain/contrato';
import {ApiRequestService} from './api-request.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ContratoService {

  private estadosContrato = ESTADO_CONTRATO;
  private urlContratos = environment.service_uri + '/contratos';


  private emitSiExisteListaContratos = new BehaviorSubject<boolean>(false);
  emittedSiExisteListaContratos = this.emitSiExisteListaContratos.asObservable();

  constructor(private apiRequest: ApiRequestService) {}

  /**
   * Se obtienen todos los contratos.
   * @returns {Observable<Contrato[]>}
   */
  getAllContratos(): Observable<Contrato[]> {
    return this.apiRequest.get(this.urlContratos);
  }

  /**
   * Se obtiene el contrato por su Id.
   * @param contratoId
   */
  getContratoById(contratoId: number): Observable<Contrato> {
    return this.apiRequest.get(this.urlContratos + '/' + contratoId);
  }

  /**
   * Se obtiene el contrato por número de contrato
   * @param nroContrato
   */
  getContratoByNroContrato(nroContrato: string): Observable<Contrato[]> {
    return this.apiRequest.get(this.urlContratos + '/filtrar/' + nroContrato);
  }

  /**
   * Se obtiene la lista de contratos filtrados
   * @param filtro
   */
  getContratosFiltrados(filtro: string): Observable<Contrato[]> {
    const url = this.urlContratos + '/by-filter?' + filtro;
    return this.apiRequest.get(url);
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
   * Se crea un nuevo contrato.
   * @param {Contrato} contrato
   * @returns {Observable<Contrato>}
   */
  crearContrato(contrato: Contrato): Observable<Contrato> {
    const url = this.urlContratos;
    return this.apiRequest.post(url, contrato);
  }

  /**
   * Se actualiza un contrato existente.
   * @param {Contrato} contrato
   * @returns {Observable<Contrato>}
   */
  editarContrato(contrato: Contrato): Observable<Contrato> {
    const url = this.urlContratos;
    return this.apiRequest.put(url, contrato);
  }

  /**
   * Cuando se crea un nuevo contrato, se avisa a la pagina home que puede mostrar la lista de contratos al presionar
   * sobre el boton Contratos del menú lateral
   * @param change
   */
  emitExisteListaContratos(change: boolean) {
    this.emitSiExisteListaContratos.next(change);
  }

}
