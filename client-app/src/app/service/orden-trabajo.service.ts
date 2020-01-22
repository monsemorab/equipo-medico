import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {OrdenTrabajo} from '../domain/orden-trabajo';
import {environment} from '../../environments/environment';

@Injectable()
export class OrdenTrabajoService {

  private urlOrdenTrabajo = environment.service_uri + '/';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todas las ordenes de trabajo creadas.
   */
  getAllOrdenTrabajo(): Observable<OrdenTrabajo[]> {
    return this.apiRequest.get(this.urlOrdenTrabajo);
  }

  /**
   * Se obtiene una orden de trabajo por su Id.
   * @param ordenId
   */
  getOrdenTrabajoById(ordenId: number): Observable<OrdenTrabajo> {
    const url = this.urlOrdenTrabajo + '/' + ordenId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea una nueva orden de trabajo.
   * @param ordenTrabajo
   */
  crearOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    const url = this.urlOrdenTrabajo;
    return this.apiRequest.post(url, ordenTrabajo);
  }

  /**
   * Se actualizan los datos de una orden de trabajo existente.
   * @param ordenTrabajo
   */
  editarOrdenTrabajo(ordenTrabajo: OrdenTrabajo): Observable<OrdenTrabajo> {
    const url = this.urlOrdenTrabajo;
    return this.apiRequest.put(url, ordenTrabajo);
  }

}
