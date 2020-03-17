import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TipoEquipo} from '../domain/tipo-equipo';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipoService {

  private urlTipoEquipos = environment.service_uri + '/tipos';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todos los tipos de equipos.
   * @returns {Observable<TipoEquipo[]>}
   */
  getAllTipoEquipos(): Observable<TipoEquipo[]> {
    const url = this.urlTipoEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene el tipo del equipo por su Id.
   * @param {number} tipoEquipoId
   * @returns {Observable<TipoEquipo>}
   */
  getTipoEquipoById(tipoEquipoId: number): Observable<TipoEquipo> {
    const url = this.urlTipoEquipos + '/' + tipoEquipoId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea un nuevo tipo de equipo
   * @param tipoCreado
   */
  crearTipoEquipo(tipoCreado: TipoEquipo): Observable<TipoEquipo> {
    const url = this.urlTipoEquipos;
    return this.apiRequest.post(url, tipoCreado);
  }

  /**
   * Se editan los datos de un tipo de equipo existente.
   * @param tipoEquipo
   */
  editarTipoEquipo(tipoEquipo: TipoEquipo): Observable<TipoEquipo> {
    const url = this.urlTipoEquipos;
    return this.apiRequest.put(url, tipoEquipo);
  }
}
