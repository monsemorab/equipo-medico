import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {ESTADO_CONTRATO} from "../utils/mock-data/mock-data";
import {Contrato, EstadoContrato} from "../domain/contrato";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ContratoService {

  private estadosContrato = ESTADO_CONTRATO;
  private url = "http://localhost:8080/api/contratos/";

  constructor(private http:HttpClient) {}

  /**
   * Se obtienen todos los contratos.
   * @returns {Observable<Contrato[]>}
   */
  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.url);
  }

  /**
   * Se obtiene la lista de los estados para un contrato.
   * @returns {Observable<EstadoContrato[]>}
   */
  getEstadosContrato(): Observable<EstadoContrato[]> {
    return Observable.of(this.estadosContrato);
  }

}
