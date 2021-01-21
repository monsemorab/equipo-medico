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

  getAllMantenimientoByEquipoId(equipoId: number):Observable<Mantenimiento[]> {
    const url = this.urlMantenimineto + '/by-equipo?id='+equipoId;
    return this.apiRequest.get(url);
  }

  getAllMantenimientoByEquipoIdAndFecha(equipoId: number, fehcaIni: any, fechaFin: any):Observable<Mantenimiento[]> {
    const url = this.urlMantenimineto + '/by-equipo-and-fecha?id='+equipoId+'&fechaInicio='+fehcaIni+'&fechaFin='+fechaFin;
    return this.apiRequest.get(url);
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
   * @param mantenimiento
   */
  editarMantenimineto(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = this.urlMantenimineto +'/';
    return this.apiRequest.put(url, mantenimiento);
  }

  /**
   * Cuando una orden de trabajo fue atendida, se avisa a la pagina home que puede mostrar la lista de
   * orden de trabajos atendidas al presionar sobre el boton Orden de Trabajo Atendidas del menú lateral
   * @param change
   */
  emitExisteOrdenTrabajoAtendida (change: boolean) {
    this.emitSiExisteOrdenTrabajoAtendida.next(change);
  }
}
