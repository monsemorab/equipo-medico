import {Injectable} from '@angular/core';
import {SOLICITUD_REPUESTOS, SOLICITUD_SERVICIO} from "../utils/mock-data/mock-data";
import {Observable} from "rxjs/Observable";
import {SolicitudRepuesto, SolicitudServicio} from "../domain/solicitud";

@Injectable()
export class SolicitudService {

  private solicitudRepuestos = SOLICITUD_REPUESTOS;
  private solicitudServicios = SOLICITUD_SERVICIO;

  constructor() {
  }


  /**
   * Se obtiene la lista de los servicios de repuestos.
   * @returns {Observable<SolicitudRepuesto[]>}
   */
  getSolicitudRepuestos(): Observable<SolicitudRepuesto[]> {
    return Observable.of(this.solicitudRepuestos);
  }

  /**
   * Se obtiene la solicitud de repuesto por su Id.
   * @param {number} solicitudId
   * @returns {Observable<SolicitudRepuesto>}
   */
  getSolicitudRepuestoById(solicitudId: number): Observable<SolicitudRepuesto> {
    return this.getSolicitudRepuestos().map(solicitudes => solicitudes.find(solicitud =>
      solicitud.id == solicitudId));
  }

  /**
   * Se obtiene la lista de los servicios de repuestos.
   * @returns {Observable<SolicitudServicio[]>}
   */
  getSolicitudServicios(): Observable<SolicitudServicio[]> {
    return Observable.of(this.solicitudServicios);
  }

  /**
   * Se obtiene la solicitud de servicio por su Id.
   * @param {number} solicitudId
   * @returns {Observable<SolicitudServicio>}
   */
  getSolicitudServicioById(solicitudId: number): Observable<SolicitudServicio> {
    return this.getSolicitudServicios().map(solicitudes => solicitudes.find(solicitud =>
      solicitud.id == solicitudId));
  }

}
