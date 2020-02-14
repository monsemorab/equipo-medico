import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Equipo} from '../domain/equipo';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {TipoEquipo} from '../domain/tipo-equipo';
import {Ubicacion} from '../domain/ubicacion';
import {ModeloEquipo} from '../domain/modelo-equipo';
import {ParamsBusquedaEquipo} from '../domain/ParamsBusquedaEquipo';

@Injectable()
export class EquipoService {
  private urlEquipos = environment.service_uri + '/equipos';
  private urlTipoEquipos = environment.service_uri + '/tipos';
  private urlModeloEquipos = environment.service_uri + '/modelos';
  private urlUbicaciones = environment.service_uri + '/ubicaciones';


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
    const url = this.urlEquipos + '/sincontrato';
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene un equipo por su Id.
   * @param {number} equipoId
   * @returns {Observable<Equipo>}
   */
  getEquipoById(equipoId: number): Observable<Equipo> {
    const url = this.urlEquipos + '/' + equipoId;
    return this.apiRequest.get(url);
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
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<ModeloEquipo[]>}
   */
  getAllModelosEquipos(): Observable<ModeloEquipo[]> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene el modelo del equipo por su Id.
   * @param {number} modeloEquipoId
   * @returns {Observable<ModeloEquipo>}
   */
  getModeloEquipoById(modeloEquipoId: number): Observable<ModeloEquipo> {
    const url = this.urlModeloEquipos + '/' + modeloEquipoId;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene la lista de las ubicaciones de los equipos.
   * @returns {Observable<Ubicacion[]>}
   */
  getAllUbicaciones(): Observable<Ubicacion[]> {
    const url = this.urlUbicaciones;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene la ubicación del equipo por su Id.
   * @param {number} ubicacionId
   * @returns {Observable<Ubicacion>}
   */
  getUbicacionById(ubicacionId: number): Observable<Ubicacion> {
    const url = this.urlUbicaciones + '/' + ubicacionId;
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
