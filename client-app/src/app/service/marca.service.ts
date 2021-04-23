import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiRequestService} from "./api-request.service";
import {Observable} from "rxjs";
import {Marca} from "../domain/marca";

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private urlMarcaEquipos = environment.service_uri + '/marcas';

  constructor(private apiRequest: ApiRequestService) {
  }


  /**
   * Se obtiene la lista de modelos para los equipos.
   * @returns {Observable<Marca[]>}
   */
  getAllMarcaEquipo(): Observable<Marca[]> {
    const url = this.urlMarcaEquipos;
    return this.apiRequest.get(url);
  }

  /**
   * Se obtiene el Marca del equipo por su Id.
   * @param {number} marcaId
   * @returns {Observable<Marca>}
   */
  getMarcaEquipoById(marcaId: number): Observable<Marca> {
    const url = this.urlMarcaEquipos + '/' + marcaId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea un nuevo Marca de equipo
   * @param modeloCreado
   */
  crearMarcaEquipo(modeloCreado: Marca): Observable<Marca> {
    const url = this.urlMarcaEquipos;
    return this.apiRequest.post(url, modeloCreado);
  }

  /**
   * Se editan los datos de un Marca de equipo existente.
   * @param Marca
   */
  editarMarcaEquipo(Marca: Marca): Observable<Marca> {
    const url = this.urlMarcaEquipos;
    return this.apiRequest.put(url, Marca);
  }
}
