import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Observable, of} from 'rxjs';
import {OrdenTrabajo, TipoServicio} from '../domain/orden-trabajo';
import {environment} from '../../environments/environment';
import {SERVICIO} from '../utils/mock-data/constantes';


@Injectable()
export class OrdenTrabajoService {

  private tipoServicios = SERVICIO;
  private urlOrdenTrabajo = environment.service_uri + '/ordentrabajo/';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de los tipos de servicios para realizar un mantenimiento.
   * Esta lista no se obtiene de la BD, son datos predefinidos.
   */
  getTipoServicios(): Observable<TipoServicio[]> {
    return of(this.tipoServicios);
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
