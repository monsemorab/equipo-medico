import {Injectable} from '@angular/core';
import {ApiRequestService} from "./api-request.service";

@Injectable()
export class SolicitudService {

  constructor(private apiRequest: ApiRequestService) {
  }


  // /**
  //  * Se obtiene la lista de los servicios de repuestos.
  //  * @returns {Observable<SolicitudRepuesto[]>}
  //  */
  // getSolicitudRepuestos(): Observable<SolicitudRepuesto[]> {
  //   return null;
  // }
  //
  // /**
  //  * Se obtiene la solicitud de repuesto por su Id.
  //  * @param {number} solicitudId
  //  * @returns {Observable<SolicitudRepuesto>}
  //  */
  // getSolicitudRepuestoById(solicitudId: number): Observable<SolicitudRepuesto> {
  //   return null;
  // }
  //
  // /**
  //  * Se obtiene la lista de los servicios de repuestos.
  //  * @returns {Observable<SolicitudServicio[]>}
  //  */
  // getSolicitudServicios(): Observable<SolicitudServicio[]> {
  //   return null;
  // }
  //
  // /**
  //  * Se obtiene la solicitud de servicio por su Id.
  //  * @param {number} solicitudId
  //  * @returns {Observable<SolicitudServicio>}
  //  */
  // getSolicitudServicioById(solicitudId: number): Observable<SolicitudServicio> {
  //   return null;
  // }

}
