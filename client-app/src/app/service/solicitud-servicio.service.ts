import {Injectable} from '@angular/core';
import {ApiRequestService} from "./api-request.service";
import {SolicitudServicio} from "../domain/solicitud";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class SolicitudServicioService {

  private urlSolicitud = environment.service_uri + '/solicitudservicios';

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todas las solicitudes de servicios.
   * @returns {Observable<SolicitudServicio[]>}
   */
  getAllSolicitudServicios(): Observable<SolicitudServicio[]> {
    return this.apiRequest.get(this.urlSolicitud);
  }

  /**
   * Se obtiene la solicitud de servicio por su Id.
   * @param {number} solicitudId
   * @returns {Observable<SolicitudServicio>}
   */
  getSolicitudServicioById(solicitudId: number): Observable<SolicitudServicio> {
    const url = this.urlSolicitud + '/' + solicitudId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea una nueva solicitud de servicio.
   * @param servicio
   */
  crearSolicitudServicio(servicio: SolicitudServicio): Observable<SolicitudServicio> {
    const url = this.urlSolicitud;
    return this.apiRequest.post(url, servicio);
  }

  /**
   * Se actualizan los datos de una solicitud de servicio existente.
   * @param servicio
   */
  editarSolicitudServicio(servicio: SolicitudServicio): Observable<SolicitudServicio> {
    const url = this.urlSolicitud;
    return this.apiRequest.put(url, servicio);
  }


}
