import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipo} from '../domain/equipo';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {ParamsBusquedaEquipo} from '../domain/ParamsBusquedaEquipo';

@Injectable()
export class EquipoService {
  private urlEquipos = environment.service_uri + '/equipos/';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtienen todos los equipos.
   * @returns {Observable<Equipo[]>}
   */
  getAllEquipos(): Observable<Equipo[]> {
    return this.apiRequest.get(this.urlEquipos);
  }

  /**
   * Se obtiene la lista de los equipos nuevos o sin contratos.
   * @returns {Observable<Equipo[]>}
   */
  getEquiposSinContratos(): Observable<Equipo[]> {
    const url = this.urlEquipos + 'sincontrato';
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene un equipo por su Id.
   * @param {number} equipoId
   * @returns {Observable<Equipo>}
   */
  getEquipoById(equipoId: number): Observable<Equipo> {
    const url = this.urlEquipos + equipoId;
    return this.apiRequest.get(url);
  }

  /**
   * Se busca un equipo deacuerdo a los parametros de busqueda enviados.
   * @param params
   */
  getEquipoByParams(params: ParamsBusquedaEquipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.post(url, params);
  }

  /**
   * Se crea un nuevo equipo con los datos introducidos en el formulario.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  crearEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.post(url, equipo);
  }

  /**
   * Se actualiza los datos de un equipo existente.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  editarEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.put(url, equipo);
  }
}
