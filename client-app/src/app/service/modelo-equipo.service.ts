import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {ModeloEquipo} from '../domain/modelo-equipo';

@Injectable({
  providedIn: 'root'
})
export class ModeloEquipoService {
  private urlModeloEquipos = environment.service_uri + '/modelos';

  constructor(private apiRequest: ApiRequestService) {
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
   * Se crea un nuevo modelo de equipo
   * @param modeloCreado
   */
  crearModeloEquipo(modeloCreado: ModeloEquipo): Observable<ModeloEquipo> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.post(url, modeloCreado);
  }

  /**
   * Se editan los datos de un modelo de equipo existente.
   * @param modeloEquipo
   */
  editarModeloEquipo(modeloEquipo: ModeloEquipo): Observable<ModeloEquipo> {
    const url = this.urlModeloEquipos;
    return this.apiRequest.put(url, modeloEquipo);
  }
}
