import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {Modelo} from '../domain/modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private urlModeloEquipos = environment.service_uri + '/modelos';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<Modelo[]>}
   */
  getAllModeloEquipo(): Observable<Modelo[]> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene el modelo del equipo por su Id.
   * @param {number} modeloId
   * @returns {Observable<Modelo>}
   */
  getModeloEquipoById(modeloId: number): Observable<Modelo> {
    const url = this.urlModeloEquipos + '/' + modeloId;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtienen los modelos que esten relacionados a una marca
   * @param marcaId
   */
  getAllModeloByMarca(marcaId:number): Observable<Modelo[]> {
    const url = this.urlModeloEquipos + '/by-marca/' + marcaId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea un nuevo modelo de equipo
   * @param modeloCreado
   */
  crearModeloEquipo(modeloCreado: Modelo): Observable<Modelo> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.post(url, modeloCreado);
  }

  /**
   * Se editan los datos de un modelo de equipo existente.
   * @param modelo
   */
  editarModeloEquipo(modelo: Modelo): Observable<Modelo> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.put(url, modelo);
  }
}
