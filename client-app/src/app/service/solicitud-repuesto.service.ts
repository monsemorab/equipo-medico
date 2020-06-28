import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiRequestService} from './api-request.service';
import {SolicitudRepuesto} from '../domain/solicitud-repuesto';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRepuestoService {

  private urlRepuestos = environment.service_uri + '/solicitudrepuestos';


  private emitSiExisteSolicitudRepuesto = new BehaviorSubject<boolean>(false);
  emittedSiExisteSolicitudRepuesto  = this.emitSiExisteSolicitudRepuesto.asObservable();

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se obtiene la lista de todas las solicitudes de repuestos.
   */
  getAllSolicitudRepuestos(): Observable<SolicitudRepuesto[]> {
    return this.apiRequest.get(this.urlRepuestos);
  }

  /**
   * Se obtiene la solicitud de repuesto por su Id.
   * @param solicitudId
   */
  getSolicitudRepuestoById(solicitudId: number): Observable<SolicitudRepuesto> {
    const url = this.urlRepuestos + '/' + solicitudId;
    return this.apiRequest.get(url);
  }

  /**
   * Se crea una nueva solicitud de repuesto.
   * @param repuesto
   */
  crearSolicitudRepuesto(repuesto: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    const url = this.urlRepuestos;
    return this.apiRequest.post(url, repuesto);
  }

  /**
   * Se actualizan los datos de una solicitud de repuesto existente.
   * @param repuesto
   */
  editarSolicitudRepuesto(repuesto: SolicitudRepuesto): Observable<SolicitudRepuesto> {
    const url = this.urlRepuestos;
    return this.apiRequest.put(url, repuesto);
  }

  /**
   * Cuando se crea una nueva orden de trabajo, se avisa a la pagina home que puede mostrar la lista de solicitud de repuestos al presionar
   * sobre el boton Solicitud Repuesto del menú lateral
   * @param change
   */
  emitExisteSolicitudRepuesto(change: boolean) {
    this.emitSiExisteSolicitudRepuesto.next(change);
  }
}
