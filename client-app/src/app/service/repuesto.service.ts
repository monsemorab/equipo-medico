import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {Repuesto} from '../domain/repuesto';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {

  private urlRepuesto = environment.service_uri + '/repuestos';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todos los repuestos.
   */
  getAllRepuestos(): Observable<Repuesto[]> {
    return this.apiRequest.get(this.urlRepuesto);
  }

  /**
   * Se obtiene el repuesto por su código.
   * @param repuestoCod
   */
  getRepuestoByCodigo(repuestoCod: string): Observable<Repuesto> {
    const url = this.urlRepuesto + '/' + repuestoCod;
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
}
