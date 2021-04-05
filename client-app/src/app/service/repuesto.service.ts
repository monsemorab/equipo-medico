import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Repuesto} from '../domain/repuesto';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {

  private urlRepuesto = environment.service_uri + '/repuestos';

  private emitSiExisteRepuesto = new BehaviorSubject<boolean>(false);
  emittedSiExisteRepuesto  = this.emitSiExisteRepuesto.asObservable();

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todos los repuestos.
   */
  getAllRepuestos(): Observable<Repuesto[]> {
    return this.apiRequest.get(this.urlRepuesto);
  }

  /**
   * Se obtiene el repuesto por su id.
   * @param repuestoId
   */
  getRepuestoById(repuestoId: number): Observable<Repuesto> {
    const url = this.urlRepuesto + '/' + repuestoId;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene el repuesto por su código.
   * @param repuestoCod
   */
  getRepuestoByCodigo(repuestoCod: string): Observable<Repuesto> {
    const url = this.urlRepuesto + '/byCodigo/' + repuestoCod;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene la lista de repuestos filtrados
   * @param filtro
   */
  getRepuestosFiltrados(filtro: string): Observable<Repuesto[]> {
    const url = this.urlRepuesto + '/by-filter?' + filtro;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea un nuevo repuesto.
   * @param repuesto
   */
  crearRepuesto(repuesto: Repuesto): Observable<Repuesto> {
    const url = this.urlRepuesto;
    return this.apiRequest.post(url, repuesto);
  }

  /**
   * Se actualizan los datos de un repuesto existente.
   * @param repuesto
   */
  editarRepuesto(repuesto: Repuesto): Observable<Repuesto> {
    const url = this.urlRepuesto;
    return this.apiRequest.put(url, repuesto);
  }

  /**
   * Cuando se crea un nuevo repeusto, se avisa a la pagina home que puede mostrar la lista de repuestos al presionar
   * sobre el boton Repeustos del menú lateral
   * @param change
   */
  emitExisteRepuesto(change: boolean) {
    this.emitSiExisteRepuesto.next(change);
  }
}
