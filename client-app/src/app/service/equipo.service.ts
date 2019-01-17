import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Equipo} from "../domain/equipo";
import {environment} from "../../environments/environment";
import {ApiRequestService} from "./api-request.service";
import {TipoEquipo} from "../domain/tipo-equipo";
import {Ubicacion} from "../domain/ubicacion";
import {ModeloEquipo} from "../domain/modelo-equipo";

@Injectable()
export class EquipoService {
  private urlEquipos = environment.service_uri + '/equipos/';


  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene todos los equipos.
   * @returns {Observable<Equipo[]>}
   */
  getEquipos(): Observable<Equipo[]> {
    // return this.http.get<Equipo[]>(this.urlEquipos);
    return this.apiRequest.get(this.urlEquipos);
  }

  /**
   * TODO: crear endpoint para obtener la lista
   * Se obtiene la lista de los equipos nuevos o sin contratos.
   * @returns {Observable<Equipo[]>}
   */
  getEquiposSinContratos(): Observable<Equipo[]> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se obtiene un equipo por su Id.
   * @param {number} equipoId
   * @returns {Observable<Equipo>}
   */
  getEquipoById(equipoId: number): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener la lista
   * Se obtiene la lista de tipos de equipos.
   * @returns {Observable<TipoEquipo[]>}
   */
  getTipoEquipos(): Observable<TipoEquipo[]> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se obtiene el tipo del equipo por su Id.
   * @param {number} tipoEquipoId
   * @returns {Observable<TipoEquipo>}
   */
  getTipoEquipoById(tipoEquipoId: number): Observable<TipoEquipo> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener la lista
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<ModeloEquipo[]>}
   */
  getModeloEquipos(): Observable<ModeloEquipo[]> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se obtiene el modelo del equipo por su Id.
   * @param {number} modeloEquipoId
   * @returns {Observable<ModeloEquipo>}
   */
  getModeloEquipoById(modeloEquipoId: number): Observable<ModeloEquipo> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener la lista
   * Se obtiene la lista de las ubicaciones de los equipos.
   * @returns {Observable<Ubicacion[]>}
   */
  getAllUbicaciones(): Observable<Ubicacion[]> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se obtiene la ubicación del equipo por su Id.
   * @param {number} ubicacionId
   * @returns {Observable<Ubicacion>}
   */
  getUbicacionById(ubicacionId: number): Observable<Ubicacion> {
    const url = this.urlEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * TODO: crear endpoint para obtener esto
   * Se crea un nuevo equipo con los datos introducidos en el formulario.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  crearEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos;
    return this.apiRequest.post(url, equipo);
  }

  /**
   * TODO: crear endpoint para obtener esto
   *
   * Se actualiza los datos de un equipo existente.
   * @param {Equipo} equipo
   * @returns {Observable<Equipo>}
   */
  editarEquipo(equipo: Equipo): Observable<Equipo> {
    const url = this.urlEquipos + '/' + equipo.id;
    return this.apiRequest.put(url, equipo);
  }
}
