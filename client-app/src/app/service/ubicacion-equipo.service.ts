import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Ubicacion} from '../domain/ubicacion';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionEquipoService {

  private urlUbicaciones = environment.service_uri + '/ubicaciones';

  constructor(private apiRequest: ApiRequestService) {
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
   * Se crea una nueva ubicacion para un equipo
   * @param ubicacion
   */
  crearUbicacionEquipo(ubicacion: Ubicacion): Observable<Ubicacion> {
    const url = this.urlUbicaciones;
    return this.apiRequest.post(url, ubicacion);
  }

  /**
   * Se editan los datos de una ubicación de equipo existente.
   * @param ubicacion
   */
  editarUbicacionEquipo(ubicacion: Ubicacion): Observable<Ubicacion> {
    const url = this.urlUbicaciones;
    return this.apiRequest.put(url, ubicacion);
  }
}
