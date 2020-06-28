import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiRequestService} from "./api-request.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Mantenimiento} from "../domain/mantenimiento";

@Injectable({
  providedIn: 'root'
})
export class ManteniminetoService {

  private urlMantenimineto = environment.service_uri + '/mantenimientos';


  private emitSiExisteOrdenTrabajoAtendida = new BehaviorSubject<boolean>(false);
  emittedSiExisteOrdenTrabajoAtendida= this.emitSiExisteOrdenTrabajoAtendida.asObservable();

  constructor(private apiRequest: ApiRequestService) {
  }

  /**
   * Se crea un mantenimineto
   * @param mantenimiento
   */
  crearMantenimineto(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = this.urlMantenimineto+'/';
    return this.apiRequest.post(url, mantenimiento);
  }

  /**
   * Se actualizan los datos de un mantenimiento existente.
   * @param ordenTrabajo
   */
  editarMantenimineto(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = this.urlMantenimineto +'/';
    return this.apiRequest.put(url, mantenimiento);
  }

  /**
   * Cuando una orden de trabajo fue atendida, se avisa a la pagina home que puede mostrar la lista de orden de trabajos atendidas al presionar
   * sobre el boton Orden de Trabajo Atendidas del menú lateral
   * @param change
   */
  emitExisteOrdenTrabajoAtendida (change: boolean) {
    this.emitSiExisteOrdenTrabajoAtendida.next(change);
  }
}
